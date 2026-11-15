export interface RotationConfig {
  angle: 0 | 90 | 180 | 270; // Normalized clockwise angle
  flipH: boolean;
  flipV: boolean;
  mode: 'reencode' | 'lossless';
}

export interface ProcessResult {
  blob: Blob;
  filename: string;
  methodUsed: 'canvas-reencode' | 'lossless-mp4-matrix';
  durationMs: number;
}

/**
 * Checks whether a file is an ISO Base Media File Format container (MP4 / MOV).
 */
export function isIsoBmffContainer(buffer: ArrayBuffer): boolean {
  if (buffer.byteLength < 16) return false;
  const view = new DataView(buffer);
  const magic = String.fromCharCode(
    view.getUint8(4),
    view.getUint8(5),
    view.getUint8(6),
    view.getUint8(7)
  );
  return (
    magic === 'ftyp' ||
    magic === 'moov' ||
    magic === 'wide' ||
    magic === 'mdat' ||
    magic === 'free'
  );
}

/**
 * Composes the user's rotation & flip with any existing `tkhd` transformation matrix
 * inside an MP4/MOV container.
 */
export function patchMp4RotationMatrix(
  sourceBuffer: ArrayBuffer,
  angle: 0 | 90 | 180 | 270,
  flipH: boolean,
  flipV: boolean
): ArrayBuffer | null {
  if (!isIsoBmffContainer(sourceBuffer)) return null;

  const buffer = sourceBuffer.slice(0);
  const view = new DataView(buffer);
  let patchedCount = 0;

  const containerBoxes = new Set(['moov', 'trak', 'mdia', 'minf', 'dinf', 'stbl', 'edts']);

  function walkBoxes(start: number, end: number) {
    let offset = start;
    while (offset + 8 <= end) {
      let size = view.getUint32(offset, false);
      const type = String.fromCharCode(
        view.getUint8(offset + 4),
        view.getUint8(offset + 5),
        view.getUint8(offset + 6),
        view.getUint8(offset + 7)
      );

      let headerSize = 8;
      if (size === 1) {
        if (offset + 16 > end) break;
        const high = view.getUint32(offset + 8, false);
        const low = view.getUint32(offset + 12, false);
        size = high * 4294967296 + low;
        headerSize = 16;
      } else if (size === 0) {
        size = end - offset;
      }

      if (size < headerSize || offset + size > end) break;

      if (type === 'tkhd') {
        const version = view.getUint8(offset + headerSize);
        const matrixOffset = offset + headerSize + (version === 1 ? 52 : 40);
        const widthOffset = matrixOffset + 36;
        const heightOffset = matrixOffset + 40;

        if (heightOffset + 4 <= offset + size) {
          const trackWidthFixed = view.getUint32(widthOffset, false);
          const trackHeightFixed = view.getUint32(heightOffset, false);

          if (trackWidthFixed > 0 && trackHeightFixed > 0) {
            // Read existing 2x2 upper-left matrix (16.16 fixed-point)
            const origA = view.getInt32(matrixOffset + 0, false) / 65536;
            const origB = view.getInt32(matrixOffset + 4, false) / 65536;
            const origC = view.getInt32(matrixOffset + 12, false) / 65536;
            const origD = view.getInt32(matrixOffset + 16, false) / 65536;

            // User rotation + flip matrix
            const rad = (angle * Math.PI) / 180;
            const cos = Math.round(Math.cos(rad));
            const sin = Math.round(Math.sin(rad));
            const sx = flipH ? -1 : 1;
            const sy = flipV ? -1 : 1;

            const uA = sx * cos;
            const uB = sx * sin;
            const uC = -sy * sin;
            const uD = sy * cos;

            // Multiply existing matrix by user transformation matrix
            const a = Math.round(origA * uA + origB * uC);
            const b = Math.round(origA * uB + origB * uD);
            const c = Math.round(origC * uA + origD * uC);
            const d = Math.round(origC * uB + origD * uD);

            const toFixed16 = (val: number) => (val * 65536) | 0;

            const w = trackWidthFixed / 65536;
            const h = trackHeightFixed / 65536;
            const corners = [
              [0, 0],
              [w, 0],
              [0, h],
              [w, h],
            ];
            let minX = Infinity;
            let minY = Infinity;
            for (const [cx, cy] of corners) {
              const rx = a * cx + c * cy;
              const ry = b * cx + d * cy;
              if (rx < minX) minX = rx;
              if (ry < minY) minY = ry;
            }
            const tx = minX < 0 ? -minX : 0;
            const ty = minY < 0 ? -minY : 0;

            view.setInt32(matrixOffset + 0, toFixed16(a), false);
            view.setInt32(matrixOffset + 4, toFixed16(b), false);
            view.setInt32(matrixOffset + 8, 0, false);
            view.setInt32(matrixOffset + 12, toFixed16(c), false);
            view.setInt32(matrixOffset + 16, toFixed16(d), false);
            view.setInt32(matrixOffset + 20, 0, false);
            view.setInt32(matrixOffset + 24, Math.round(tx * 65536), false);
            view.setInt32(matrixOffset + 28, Math.round(ty * 65536), false);
            view.setInt32(matrixOffset + 32, 0x40000000, false);

            patchedCount++;
          }
        }
      } else if (containerBoxes.has(type)) {
        walkBoxes(offset + headerSize, offset + size);
      }

      offset += size;
    }
  }

  walkBoxes(0, buffer.byteLength);
  return patchedCount > 0 ? buffer : null;
}

/**
 * Physically rotates and/or flips every video frame on an HTML5 Canvas
 * and encodes the rotated video + original audio stream via MediaRecorder.
 * Guarantees 100% of video players display the rotated video.
 */
export async function reencodeVideoViaCanvas(
  file: File,
  config: RotationConfig,
  onProgress?: (percent: number) => void
): Promise<{ blob: Blob; ext: string }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.playsInline = true;
    video.preload = 'auto';
    video.crossOrigin = 'anonymous';
    const objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;

    let audioCtx: AudioContext | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let animId = 0;

    const cleanup = () => {
      if (intervalId) clearInterval(intervalId);
      if (animId) cancelAnimationFrame(animId);
      if (audioCtx && audioCtx.state !== 'closed') {
        audioCtx.close().catch(() => {});
      }
      URL.revokeObjectURL(objectUrl);
    };

    video.onerror = () => {
      cleanup();
      reject(new Error('Failed to decode video file in browser.'));
    };

    video.onloadedmetadata = async () => {
      try {
        const srcW = video.videoWidth || 1280;
        const srcH = video.videoHeight || 720;
        const isSwapped = config.angle === 90 || config.angle === 270;
        const outW = isSwapped ? srcH : srcW;
        const outH = isSwapped ? srcW : srcH;

        const canvas = document.createElement('canvas');
        canvas.width = outW;
        canvas.height = outH;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) throw new Error('Canvas 2D context unavailable');

        const drawTransformedFrame = () => {
          ctx.save();
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, outW, outH);
          ctx.translate(outW / 2, outH / 2);
          ctx.rotate((config.angle * Math.PI) / 180);
          ctx.scale(config.flipH ? -1 : 1, config.flipV ? -1 : 1);
          ctx.drawImage(video, -srcW / 2, -srcH / 2, srcW, srcH);
          ctx.restore();
        };

        // Draw initial frame immediately
        drawTransformedFrame();

        const canvasStream = canvas.captureStream(30);
        const combinedTracks: MediaStreamTrack[] = [...canvasStream.getVideoTracks()];

        // Capture audio stream silently via Web Audio API so audio is preserved without speaker echo
        try {
          const AudioContextClass =
            window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (AudioContextClass) {
            audioCtx = new AudioContextClass();
            const sourceNode = audioCtx.createMediaElementSource(video);
            const destNode = audioCtx.createMediaStreamDestination();
            sourceNode.connect(destNode);
            const audioTracks = destNode.stream.getAudioTracks();
            if (audioTracks.length > 0) {
              combinedTracks.push(audioTracks[0]);
            }
          } else {
            video.muted = true;
          }
        } catch {
          video.muted = true;
        }

        const outputStream = new MediaStream(combinedTracks);

        const mimeCandidates = [
          'video/mp4;codecs=avc1,mp4a.40.2',
          'video/mp4;codecs=avc1',
          'video/mp4',
          'video/webm;codecs=vp9,opus',
          'video/webm;codecs=vp8,opus',
          'video/webm',
        ];
        const selectedMime =
          mimeCandidates.find(
            (m) => typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(m)
          ) || 'video/webm';
        const ext = selectedMime.includes('mp4') ? 'mp4' : 'webm';

        const recorder = new MediaRecorder(outputStream, {
          mimeType: selectedMime,
          videoBitsPerSecond: 8_000_000,
        });

        const chunks: BlobPart[] = [];
        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
          cleanup();
          const blob = new Blob(chunks, { type: selectedMime.split(';')[0] });
          if (onProgress) onProgress(100);
          resolve({ blob, ext });
        };

        const duration =
          Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 3;

        const updateFrameAndProgress = () => {
          if (video.paused || video.ended) return;
          drawTransformedFrame();
          if (onProgress) {
            const pct = Math.min(99, Math.max(5, Math.round((video.currentTime / duration) * 100)));
            onProgress(pct);
          }
        };

        const rAFLoop = () => {
          if (video.paused || video.ended) return;
          updateFrameAndProgress();
          animId = requestAnimationFrame(rAFLoop);
        };

        // Fallback interval ensures frames keep rendering even if tab is backgrounded
        intervalId = setInterval(updateFrameAndProgress, 33);

        video.onended = () => {
          drawTransformedFrame();
          if (recorder.state === 'recording') {
            recorder.stop();
          }
        };

        video.currentTime = 0;
        recorder.start(100);
        await video.play();
        rAFLoop();
      } catch (err) {
        cleanup();
        reject(err);
      }
    };
  });
}

/**
 * Main entry point to process a rotated/flipped video 100% in the browser.
 * Defaults to true pixel re-encoding ('reencode') so the downloaded video is
 * physically rotated in all players.
 */
export async function processVideoClientSide(
  file: File,
  config: RotationConfig,
  onProgress?: (percent: number) => void
): Promise<ProcessResult> {
  const startTime = performance.now();
  const baseName = file.name.replace(/\.[^/.]+$/, '') || 'video';
  const suffixParts: string[] = [];
  if (config.angle !== 0) suffixParts.push(`${config.angle}deg`);
  if (config.flipH) suffixParts.push('flipH');
  if (config.flipV) suffixParts.push('flipV');
  const suffix = suffixParts.length > 0 ? suffixParts.join('-') : 'rotated';

  // Only use metadata matrix patching if explicitly requested AND no mirror flips are active
  if (config.mode === 'lossless' && !config.flipH && !config.flipV) {
    if (onProgress) onProgress(25);
    const arrayBuffer = await file.arrayBuffer();
    const patchedBuffer = patchMp4RotationMatrix(
      arrayBuffer,
      config.angle,
      config.flipH,
      config.flipV
    );

    if (patchedBuffer) {
      if (onProgress) onProgress(100);
      const origExt = file.name.split('.').pop()?.toLowerCase() || 'mp4';
      const mimeType = origExt === 'mov' ? 'video/quicktime' : 'video/mp4';
      const blob = new Blob([patchedBuffer], { type: mimeType });
      return {
        blob,
        filename: `${baseName}-rotated-${suffix}.${origExt}`,
        methodUsed: 'lossless-mp4-matrix',
        durationMs: Math.round(performance.now() - startTime),
      };
    }
  }

  // Primary Universal Pixel Re-encode via HTML5 Canvas (physically rotates video pixels)
  const { blob, ext } = await reencodeVideoViaCanvas(file, config, onProgress);
  return {
    blob,
    filename: `${baseName}-rotated-${suffix}.${ext}`,
    methodUsed: 'canvas-reencode',
    durationMs: Math.round(performance.now() - startTime),
  };
}

/**
 * Generates an in-memory MP4/WebM sample video so users can test rotation in 1 click.
 */
export async function generateSampleVideoFile(): Promise<File> {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext('2d')!;

  const mimeCandidates = [
    'video/mp4;codecs=avc1',
    'video/mp4',
    'video/webm;codecs=vp9',
    'video/webm',
  ];
  const selectedMime =
    mimeCandidates.find(
      (m) => typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(m)
    ) || 'video/webm';
  const ext = selectedMime.includes('mp4') ? 'mp4' : 'webm';

  const stream = canvas.captureStream(30);
  const recorder = new MediaRecorder(stream, { mimeType: selectedMime });
  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data);
  };

  return new Promise((resolve) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: selectedMime.split(';')[0] });
      const file = new File([blob], `sample-orientation-test.${ext}`, {
        type: selectedMime.split(';')[0],
      });
      resolve(file);
    };

    recorder.start();
    let frame = 0;
    const totalFrames = 45; // 1.5 seconds at 30fps

    const drawFrame = () => {
      ctx.fillStyle = '#EEE0C9';
      ctx.fillRect(0, 0, 640, 360);

      ctx.strokeStyle = '#96B6C5';
      ctx.lineWidth = 16;
      ctx.strokeRect(8, 8, 624, 344);

      ctx.fillStyle = '#96B6C5';
      ctx.fillRect(180, 28, 280, 54);
      ctx.fillStyle = '#1E293B';
      ctx.font = 'bold 26px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('▲ TOP OF VIDEO ▲', 320, 64);

      ctx.save();
      ctx.translate(320, 195);
      ctx.fillStyle = '#1E293B';
      ctx.font = 'bold 34px sans-serif';
      ctx.fillText('ROTATE VIDEO TEST', 0, -10);

      const pulse = Math.sin((frame / totalFrames) * Math.PI * 2) * 40;
      ctx.fillStyle = '#96B6C5';
      ctx.beginPath();
      ctx.arc(pulse, 45, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = '#1E293B';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('◀ LEFT', 32, 195);
      ctx.textAlign = 'right';
      ctx.fillText('RIGHT ▶', 608, 195);

      frame++;
      if (frame < totalFrames) {
        requestAnimationFrame(drawFrame);
      } else {
        recorder.stop();
      }
    };

    drawFrame();
  });
}
