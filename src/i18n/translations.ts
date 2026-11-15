export interface LanguageOption {
  code: 'en' | 'es' | 'pt' | 'de' | 'fr' | 'ja' | 'zh' | 'ru';
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish (Español)', nativeName: 'Español' },
  { code: 'pt', name: 'Portuguese (Português)', nativeName: 'Português' },
  { code: 'de', name: 'German (Deutsch)', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French (Français)', nativeName: 'Français' },
  { code: 'ja', name: 'Japanese (日本語)', nativeName: '日本語' },
  { code: 'zh', name: 'Simplified Chinese (简体中文)', nativeName: '简体中文' },
  { code: 'ru', name: 'Russian (Русский)', nativeName: 'Русский' },
];

export type TranslationKeys = {
  nav_install_pwa: string;
  nav_install_pwa_tooltip: string;
  nav_support: string;
  nav_support_tooltip: string;
  nav_theme_toggle: string;
  nav_github_tooltip: string;
  nav_lang_label: string;
  hero_badge: string;
  hero_title: string;
  hero_subtitle: string;
  step1_badge: string;
  step1_title: string;
  step2_badge: string;
  step2_title: string;
  step3_badge: string;
  step3_title: string;
  drop_title: string;
  drop_subtitle: string;
  choose_file_btn: string;
  sample_video_btn: string;
  change_video_btn: string;
  rotate_left_90: string;
  rotate_right_90: string;
  rotate_180: string;
  flip_horizontal: string;
  flip_vertical: string;
  reset_btn: string;
  mode_label: string;
  mode_lossless: string;
  mode_reencode: string;
  download_btn: string;
  processing_msg: string;
  ready_msg: string;
  privacy_pill: string;
  offline_pill: string;
  pwa_modal_title: string;
  pwa_modal_desc: string;
  pwa_modal_ios: string;
  pwa_modal_desktop: string;
  pwa_modal_close: string;
};

export const TRANSLATIONS: Record<LanguageOption['code'], TranslationKeys> = {
  en: {
    nav_install_pwa: 'Add to Home Screen',
    nav_install_pwa_tooltip: 'Install app to rotate videos 100% offline',
    nav_support: 'Support the Developer',
    nav_support_tooltip: 'Buy the developer a coffee on Gumroad',
    nav_theme_toggle: 'Toggle Light / Dark theme',
    nav_github_tooltip: 'View source code on GitHub',
    nav_lang_label: 'Select Language',
    hero_badge: '100% Client-Side · Zero Server Uploads · Free Forever',
    hero_title: 'Rotate Video Online Free',
    hero_subtitle:
      'Fix sideways or upside-down MP4, WebM, MOV, and MKV videos instantly in your browser with zero quality loss.',
    step1_badge: 'STEP 1',
    step1_title: 'Drop or Choose Video',
    step2_badge: 'STEP 2',
    step2_title: 'Rotate or Flip Live',
    step3_badge: 'STEP 3',
    step3_title: 'Download Instantly',
    drop_title: 'Drop your video here or click to browse',
    drop_subtitle: 'Supports MP4, WebM, MOV, MKV · Processed 100% on your device',
    choose_file_btn: 'Choose Video File',
    sample_video_btn: 'Load Sample Video',
    change_video_btn: 'Choose Another Video',
    rotate_left_90: 'Rotate 90° Left',
    rotate_right_90: 'Rotate 90° Right',
    rotate_180: 'Rotate 180°',
    flip_horizontal: 'Flip Horizontal',
    flip_vertical: 'Flip Vertical',
    reset_btn: 'Reset',
    mode_label: 'Export Engine:',
    mode_lossless: 'Smart Lossless (Instant MP4/MOV + Canvas Fallback)',
    mode_reencode: 'Universal Pixel Re-Encode (Bakes Flips & Rotation)',
    download_btn: 'Download Rotated Video',
    processing_msg: 'Processing rotated video in your browser...',
    ready_msg: 'Rotated video downloaded! Your file never left your device.',
    privacy_pill: '100% Private (No Uploads)',
    offline_pill: 'Works Offline (PWA)',
    pwa_modal_title: 'Install RotateVideo for Offline Use',
    pwa_modal_desc:
      'Save RotateVideo to your home screen or desktop to rotate videos anytime with zero internet connection.',
    pwa_modal_ios:
      'iOS / Safari: Tap the Share icon in the browser bar, then select "Add to Home Screen".',
    pwa_modal_desktop:
      'Desktop Chrome / Edge: Click the install icon in the address bar or open browser menu → "Install Rotate Video Online".',
    pwa_modal_close: 'Got It',
  },
  es: {
    nav_install_pwa: 'Añadir a Inicio',
    nav_install_pwa_tooltip: 'Instalar aplicación para rotar videos 100% sin conexión',
    nav_support: 'Apoyar al Creador',
    nav_support_tooltip: 'Invita un café al desarrollador en Gumroad',
    nav_theme_toggle: 'Cambiar tema Claro / Oscuro',
    nav_github_tooltip: 'Ver código fuente en GitHub',
    nav_lang_label: 'Seleccionar idioma',
    hero_badge: '100% en tu Navegador · Cero Subidas · Gratis Siempre',
    hero_title: 'Rotar Video Online Gratis',
    hero_subtitle:
      'Gira videos MP4, WebM, MOV y MKV al instante directamente en tu navegador sin perder calidad.',
    step1_badge: 'PASO 1',
    step1_title: 'Suelta o Elige tu Video',
    step2_badge: 'PASO 2',
    step2_title: 'Gira o Voltea en Vivo',
    step3_badge: 'PASO 3',
    step3_title: 'Descarga al Instante',
    drop_title: 'Arrastra tu video aquí o haz clic para buscar',
    drop_subtitle: 'Soporta MP4, WebM, MOV, MKV · Procesado 100% en tu dispositivo',
    choose_file_btn: 'Elegir Archivo de Video',
    sample_video_btn: 'Probar Video de Ejemplo',
    change_video_btn: 'Cambiar Video',
    rotate_left_90: 'Girar 90° Izquierda',
    rotate_right_90: 'Girar 90° Derecha',
    rotate_180: 'Girar 180°',
    flip_horizontal: 'Espejo Horizontal',
    flip_vertical: 'Volteo Vertical',
    reset_btn: 'Restablecer',
    mode_label: 'Modo de Exportación:',
    mode_lossless: 'Sin Pérdida Instantáneo (MP4/MOV + Canvas)',
    mode_reencode: 'Recodificación Universal (Píxeles Fijos)',
    download_btn: 'Descargar Video Rotado',
    processing_msg: 'Procesando video rotado en tu navegador...',
    ready_msg: '¡Video descargado! Tu archivo nunca salió de tu dispositivo.',
    privacy_pill: '100% Privado (Sin Subidas)',
    offline_pill: 'Funciona Sin Internet (PWA)',
    pwa_modal_title: 'Instalar RotateVideo Sin Conexión',
    pwa_modal_desc:
      'Guarda RotateVideo en tu pantalla de inicio o escritorio para rotar videos sin conexión a internet.',
    pwa_modal_ios:
      'iOS / Safari: Toca el icono Compartir y selecciona "Añadir a pantalla de inicio".',
    pwa_modal_desktop:
      'Chrome / Edge: Haz clic en el icono de instalar en la barra de direcciones.',
    pwa_modal_close: 'Entendido',
  },
  pt: {
    nav_install_pwa: 'Adicionar à Tela Inicial',
    nav_install_pwa_tooltip: 'Instalar app para girar vídeos 100% offline',
    nav_support: 'Apoiar o Criador',
    nav_support_tooltip: 'Pague um café ao desenvolvedor no Gumroad',
    nav_theme_toggle: 'Alternar tema Claro / Escuro',
    nav_github_tooltip: 'Ver código-fonte no GitHub',
    nav_lang_label: 'Selecionar idioma',
    hero_badge: '100% no Navegador · Zero Uploads · Sempre Grátis',
    hero_title: 'Girar Vídeo Online Grátis',
    hero_subtitle:
      'Corrija vídeos MP4, WebM, MOV e MKV virados instantaneamente no navegador sem perda de qualidade.',
    step1_badge: 'PASSO 1',
    step1_title: 'Solte ou Escolha o Vídeo',
    step2_badge: 'PASSO 2',
    step2_title: 'Gire ou Inverta ao Vivo',
    step3_badge: 'PASSO 3',
    step3_title: 'Baixe Instantaneamente',
    drop_title: 'Arraste seu vídeo aqui ou clique para procurar',
    drop_subtitle: 'Suporta MP4, WebM, MOV, MKV · Processado 100% no seu aparelho',
    choose_file_btn: 'Escolher Arquivo de Vídeo',
    sample_video_btn: 'Carregar Vídeo de Exemplo',
    change_video_btn: 'Trocar Vídeo',
    rotate_left_90: 'Girar 90° Esquerda',
    rotate_right_90: 'Girar 90° Direita',
    rotate_180: 'Girar 180°',
    flip_horizontal: 'Espelhar Horizontal',
    flip_vertical: 'Inverter Vertical',
    reset_btn: 'Redefinir',
    mode_label: 'Modo de Exportação:',
    mode_lossless: 'Sem Perdas Instantâneo (MP4/MOV + Canvas)',
    mode_reencode: 'Recodificação Universal (Gravar nos Pixels)',
    download_btn: 'Baixar Vídeo Girado',
    processing_msg: 'Processando vídeo girado no navegador...',
    ready_msg: 'Vídeo baixado! Seu arquivo nunca saiu do seu dispositivo.',
    privacy_pill: '100% Privado (Sem Uploads)',
    offline_pill: 'Funciona Offline (PWA)',
    pwa_modal_title: 'Instalar RotateVideo para Uso Offline',
    pwa_modal_desc:
      'Adicione o RotateVideo à sua tela inicial para girar vídeos mesmo sem internet.',
    pwa_modal_ios:
      'iOS / Safari: Toque em Compartilhar e selecione "Adicionar à Tela de Início".',
    pwa_modal_desktop:
      'Chrome / Edge: Clique no ícone de instalação na barra de endereços.',
    pwa_modal_close: 'Entendi',
  },
  de: {
    nav_install_pwa: 'Zum Startbildschirm',
    nav_install_pwa_tooltip: 'App installieren, um Videos 100% offline zu drehen',
    nav_support: 'Entwickler unterstützen',
    nav_support_tooltip: 'Spendiere dem Entwickler einen Kaffee auf Gumroad',
    nav_theme_toggle: 'Hell- / Dunkelmodus umschalten',
    nav_github_tooltip: 'Quellcode auf GitHub ansehen',
    nav_lang_label: 'Sprache wählen',
    hero_badge: '100% im Browser · Keine Server-Uploads · Kostenlos',
    hero_title: 'Video Online Drehen Kostenlos',
    hero_subtitle:
      'Drehen und spiegeln Sie MP4-, WebM-, MOV- und MKV-Videos sofort im Browser ohne Qualitätsverlust.',
    step1_badge: 'SCHRITT 1',
    step1_title: 'Video ablegen oder wählen',
    step2_badge: 'SCHRITT 2',
    step2_title: 'Video drehen oder spiegeln',
    step3_badge: 'SCHRITT 3',
    step3_title: 'Sofort herunterladen',
    drop_title: 'Video hierher ziehen oder klicken zum Auswählen',
    drop_subtitle: 'Unterstützt MP4, WebM, MOV, MKV · 100% lokal auf Ihrem Gerät',
    choose_file_btn: 'Videodatei auswählen',
    sample_video_btn: 'Beispielvideo laden',
    change_video_btn: 'Anderes Video wählen',
    rotate_left_90: '90° nach links',
    rotate_right_90: '90° nach rechts',
    rotate_180: '180° drehen',
    flip_horizontal: 'Horizontal spiegeln',
    flip_vertical: 'Vertikal spiegeln',
    reset_btn: 'Zurücksetzen',
    mode_label: 'Export-Modus:',
    mode_lossless: 'Verlustfrei Sofort (MP4/MOV + Canvas)',
    mode_reencode: 'Universelle Neukodierung (Pixel festbrennen)',
    download_btn: 'Gedrehtes Video herunterladen',
    processing_msg: 'Video wird lokal in Ihrem Browser verarbeitet...',
    ready_msg: 'Video heruntergeladen! Ihre Datei hat Ihr Gerät nie verlassen.',
    privacy_pill: '100% Privat (Kein Upload)',
    offline_pill: 'Offline nutzbar (PWA)',
    pwa_modal_title: 'RotateVideo für Offline-Nutzung installieren',
    pwa_modal_desc:
      'Speichern Sie RotateVideo auf Ihrem Gerät, um Videos jederzeit ohne Internet zu drehen.',
    pwa_modal_ios:
      'iOS / Safari: Tippen Sie auf Teilen und wählen Sie „Zum Home-Bildschirm“.',
    pwa_modal_desktop:
      'Chrome / Edge: Klicken Sie auf das Installationssymbol in der Adressleiste.',
    pwa_modal_close: 'Verstanden',
  },
  fr: {
    nav_install_pwa: 'Ajouter à l’écran',
    nav_install_pwa_tooltip: 'Installer l’application pour pivoter des vidéos hors ligne',
    nav_support: 'Soutenir le créateur',
    nav_support_tooltip: 'Offrir un café au développeur sur Gumroad',
    nav_theme_toggle: 'Basculer le thème Clair / Sombre',
    nav_github_tooltip: 'Voir le code source sur GitHub',
    nav_lang_label: 'Choisir la langue',
    hero_badge: '100% Local · Zéro Envoi Serveur · 100% Gratuit',
    hero_title: 'Pivoter une Vidéo en Ligne Gratuitement',
    hero_subtitle:
      'Tournez et retournez vos vidéos MP4, WebM, MOV et MKV instantanément dans votre navigateur sans perte.',
    step1_badge: 'ÉTAPE 1',
    step1_title: 'Glisser ou Choisir la Vidéo',
    step2_badge: 'ÉTAPE 2',
    step2_title: 'Pivoter ou Retourner',
    step3_badge: 'ÉTAPE 3',
    step3_title: 'Télécharger Instantanément',
    drop_title: 'Glissez votre vidéo ici ou cliquez pour parcourir',
    drop_subtitle: 'MP4, WebM, MOV, MKV · Traité à 100% sur votre appareil',
    choose_file_btn: 'Choisir un Fichier Vidéo',
    sample_video_btn: 'Vidéo de Démonstration',
    change_video_btn: 'Changer de Vidéo',
    rotate_left_90: 'Pivoter 90° Gauche',
    rotate_right_90: 'Pivoter 90° Droite',
    rotate_180: 'Pivoter 180°',
    flip_horizontal: 'Miroir Horizontal',
    flip_vertical: 'Miroir Vertical',
    reset_btn: 'Réinitialiser',
    mode_label: 'Mode d’export :',
    mode_lossless: 'Sans Perte Instantané (MP4/MOV + Canvas)',
    mode_reencode: 'Ré-encodage Universel (Pixels intégrés)',
    download_btn: 'Télécharger la Vidéo Pivotée',
    processing_msg: 'Traitement de la vidéo dans votre navigateur...',
    ready_msg: 'Vidéo téléchargée ! Votre fichier n’a jamais quitté votre appareil.',
    privacy_pill: '100% Privé (Zéro Upload)',
    offline_pill: 'Fonctionne Hors Ligne (PWA)',
    pwa_modal_title: 'Installer RotateVideo Hors Ligne',
    pwa_modal_desc:
      'Ajoutez RotateVideo à votre écran d’accueil pour pivoter vos vidéos sans connexion internet.',
    pwa_modal_ios:
      'iOS / Safari : Appuyez sur Partager puis « Sur l’écran d’accueil ».',
    pwa_modal_desktop:
      'Chrome / Edge : Cliquez sur l’icône d’installation dans la barre d’adresse.',
    pwa_modal_close: 'Fermer',
  },
  ja: {
    nav_install_pwa: 'ホーム画面に追加',
    nav_install_pwa_tooltip: 'オフラインで動画を回転できるようにアプリをインストール',
    nav_support: '開発者を支援',
    nav_support_tooltip: 'Gumroadで開発者にコーヒーを贈る',
    nav_theme_toggle: 'ライト / ダークモード切替',
    nav_github_tooltip: 'GitHubでソースコードを見る',
    nav_lang_label: '言語を選択',
    hero_badge: '100%ブラウザ処理 · サーバー送信なし · 完全無料',
    hero_title: 'オンラインで動画を無料回転',
    hero_subtitle:
      'MP4、WebM、MOV、MKV動画を無劣化・高速にブラウザ上で90°・180°回転＆反転できます。',
    step1_badge: 'ステップ 1',
    step1_title: '動画を選択またはドロップ',
    step2_badge: 'ステップ 2',
    step2_title: '回転・反転をプレビュー',
    step3_badge: 'ステップ 3',
    step3_title: 'すぐにダウンロード',
    drop_title: 'ここに動画をドロップ、またはクリックして選択',
    drop_subtitle: 'MP4, WebM, MOV, MKV対応 · 100%お使いの端末内で安全処理',
    choose_file_btn: '動画ファイルを選択',
    sample_video_btn: 'サンプル動画で試す',
    change_video_btn: '別の動画を選択',
    rotate_left_90: '左へ 90° 回転',
    rotate_right_90: '右へ 90° 回転',
    rotate_180: '180° 回転',
    flip_horizontal: '左右反転',
    flip_vertical: '上下反転',
    reset_btn: 'リセット',
    mode_label: '出力モード:',
    mode_lossless: '高速ロスレス (MP4/MOV瞬時出力 + Canvas)',
    mode_reencode: 'ユニバーサル再エンコード (全環境対応)',
    download_btn: '回転した動画をダウンロード',
    processing_msg: 'ブラウザ内で動画を処理しています...',
    ready_msg: 'ダウンロード完了！動画が外部サーバーに送信されることはありません。',
    privacy_pill: '100% プライバシー保護',
    offline_pill: 'オフライン対応 (PWA)',
    pwa_modal_title: 'RotateVideoをホーム画面に追加',
    pwa_modal_desc:
      'アプリをインストールすると、インターネット接続なしでもいつでも動画を回転できます。',
    pwa_modal_ios:
      'iOS / Safari: 共有ボタンをタップし「ホーム画面に追加」を選択してください。',
    pwa_modal_desktop:
      'Chrome / Edge: アドレスバー右側のインストールアイコンをクリックしてください。',
    pwa_modal_close: '閉じる',
  },
  zh: {
    nav_install_pwa: '添加到主屏幕',
    nav_install_pwa_tooltip: '安装离线应用，无需网络即可旋转视频',
    nav_support: '支持开发者',
    nav_support_tooltip: '在 Gumroad 上请开发者喝杯咖啡',
    nav_theme_toggle: '切换浅色 / 深色模式',
    nav_github_tooltip: '在 GitHub 上查看源码',
    nav_lang_label: '选择语言',
    hero_badge: '100% 浏览器本地处理 · 零上传 · 永久免费',
    hero_title: '免费在线旋转视频',
    hero_subtitle:
      '在浏览器中即时将 MP4、WebM、MOV 和 MKV 视频旋转 90°、180° 或镜像翻转，零画质损失。',
    step1_badge: '第 1 步',
    step1_title: '拖入或选择视频',
    step2_badge: '第 2 步',
    step2_title: '实时旋转或翻转',
    step3_badge: '第 3 步',
    step3_title: '立即下载保存',
    drop_title: '将视频拖放到此处，或点击浏览文件',
    drop_subtitle: '支持 MP4, WebM, MOV, MKV · 100% 在您的设备本地处理',
    choose_file_btn: '选择视频文件',
    sample_video_btn: '加载示例视频',
    change_video_btn: '更换其他视频',
    rotate_left_90: '向左旋转 90°',
    rotate_right_90: '向右旋转 90°',
    rotate_180: '旋转 180°',
    flip_horizontal: '水平镜像翻转',
    flip_vertical: '垂直上下翻转',
    reset_btn: '重置',
    mode_label: '导出模式：',
    mode_lossless: '智能无损极速模式 (MP4/MOV 秒级导出)',
    mode_reencode: '通用像素重编码模式 (兼容所有播放器)',
    download_btn: '下载旋转后的视频',
    processing_msg: '正在浏览器本地处理您的视频...',
    ready_msg: '下载完成！您的视频从未离开过您的设备。',
    privacy_pill: '100% 隐私安全 (零上传)',
    offline_pill: '支持离线使用 (PWA)',
    pwa_modal_title: '安装 RotateVideo 离线应用',
    pwa_modal_desc: '将 RotateVideo 添加到主屏幕或桌面，随时随地离线旋转视频。',
    pwa_modal_ios: 'iOS / Safari：点击底部“分享”图标，然后选择“添加到主屏幕”。',
    pwa_modal_desktop: '桌面 Chrome / Edge：点击地址栏右侧的“安装”图标即可。',
    pwa_modal_close: '知道了',
  },
  ru: {
    nav_install_pwa: 'На главный экран',
    nav_install_pwa_tooltip: 'Установить приложение для поворота видео без интернета',
    nav_support: 'Поддержать автора',
    nav_support_tooltip: 'Угостить разработчика кофе на Gumroad',
    nav_theme_toggle: 'Переключить светлую / тёмную тему',
    nav_github_tooltip: 'Исходный код на GitHub',
    nav_lang_label: 'Выбрать язык',
    hero_badge: '100% в браузере · Без загрузки на сервер · Бесплатно',
    hero_title: 'Повернуть Видео Онлайн Бесплатно',
    hero_subtitle:
      'Мгновенно поворачивайте и отражайте видео MP4, WebM, MOV и MKV прямо в браузере без потери качества.',
    step1_badge: 'ШАГ 1',
    step1_title: 'Выберите видеофайл',
    step2_badge: 'ШАГ 2',
    step2_title: 'Поверните или отразите',
    step3_badge: 'ШАГ 3',
    step3_title: 'Скачайте мгновенно',
    drop_title: 'Перетащите видео сюда или нажмите для выбора',
    drop_subtitle: 'Поддержка MP4, WebM, MOV, MKV · 100% локальная обработка',
    choose_file_btn: 'Выбрать Видеофайл',
    sample_video_btn: 'Загрузить демо-видео',
    change_video_btn: 'Выбрать другое видео',
    rotate_left_90: 'Повернуть на 90° влево',
    rotate_right_90: 'Повернуть на 90° вправо',
    rotate_180: 'Повернуть на 180°',
    flip_horizontal: 'Отразить по горизонтали',
    flip_vertical: 'Отразить по вертикали',
    reset_btn: 'Сбросить',
    mode_label: 'Режим экспорта:',
    mode_lossless: 'Мгновенно без потерь (MP4/MOV + Canvas)',
    mode_reencode: 'Универсальное перекодирование пикселей',
    download_btn: 'Скачать Повернутое Видео',
    processing_msg: 'Обработка видео в вашем браузере...',
    ready_msg: 'Видео скачано! Ваш файл не покидал ваше устройство.',
    privacy_pill: '100% Приватно (Без сервера)',
    offline_pill: 'Работает офлайн (PWA)',
    pwa_modal_title: 'Установить RotateVideo для работы офлайн',
    pwa_modal_desc:
      'Добавьте RotateVideo на главный экран или рабочий стол, чтобы поворачивать видео без интернета.',
    pwa_modal_ios:
      'iOS / Safari: Нажмите кнопку «Поделиться» и выберите «На экран „Домой“».',
    pwa_modal_desktop:
      'Chrome / Edge: Нажмите значок установки в адресной строке браузера.',
    pwa_modal_close: 'Понятно',
  },
};
