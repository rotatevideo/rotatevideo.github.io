# Rotate Video Online Free — [rotatevideo.github.io](https://rotatevideo.github.io/)

[![Live Website](https://img.shields.io/badge/Live_Demo-rotatevideo.github.io-96B6C5?style=for-the-badge&logo=googlechrome&logoColor=1E293B)](https://rotatevideo.github.io/)
[![Built with Astro](https://img.shields.io/badge/Astro-Islands_Architecture-EEE0C9?style=for-the-badge&logo=astro&logoColor=1E293B)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-ADC4CE?style=for-the-badge&logo=tailwindcss&logoColor=1E293B)](https://tailwindcss.com/)
[![100% Client-Side](https://img.shields.io/badge/Privacy-100%25_Client--Side_(Zero_Uploads)-96B6C5?style=for-the-badge&logo=shield&logoColor=1E293B)](https://rotatevideo.github.io/)
[![Offline PWA](https://img.shields.io/badge/PWA-100%25_Offline_Capable-EEE0C9?style=for-the-badge&logo=pwa&logoColor=1E293B)](https://rotatevideo.github.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-1E293B?style=for-the-badge)](./LICENSE)
[![Support the Developer](https://img.shields.io/badge/Support_Developer-Buy_Me_a_Coffee-96B6C5?style=for-the-badge&logo=buymeacoffee&logoColor=1E293B)](https://kisharadilshan.gumroad.com/coffee)

**Rotate Video Online** ([https://rotatevideo.github.io/](https://rotatevideo.github.io/)) is a fast, ultra-minimal, **100% client-side** web application for rotating and flipping **MP4, WebM, MOV, and MKV** video files directly in your browser with **zero server uploads**, **zero watermarks**, and **full offline PWA support**.

---

## ✨ Key Features

- **🔒 100% Client-Side Privacy (Zero Server Uploads)**: Your video files never leave your computer or phone. All rotation and mirroring happens locally inside your browser.
- **⚡ Dual-Engine Video Rotation**:
  - **Smart Lossless Engine (MP4 / MOV)**: Rewrites the ISO Base Media File Format (`tkhd` track header) 3×3 transformation matrix in milliseconds with **0% quality loss** and zero re-encoding.
  - **Universal Pixel Re-Encode Engine (HTML5 Canvas / MediaRecorder)**: Bakes 90° Clockwise, 90° Counter-Clockwise, 180° Flip, Horizontal Mirror, and Vertical Flip directly into the video pixel stream for universal compatibility across all players.
- **🎬 Smooth 60fps Hardware-Accelerated Preview**: Real-time CSS hardware-accelerated rotation transitions (`transition-transform duration-500 ease-out`) as you click rotation controls.
- **📲 100% Offline-Capable PWA ("Add to Home Screen")**: Complete `manifest.webmanifest` and Service Worker (`sw.js`) cache all static HTML, CSS, JS, and vector assets so you can rotate videos on an airplane or offline.
- **🌍 8 Languages Built-In**: Instant client-side localization for:
  - English (`en`)
  - Spanish — Español (`es`)
  - Portuguese — Português (`pt`)
  - German — Deutsch (`de`)
  - French — Français (`fr`)
  - Japanese — 日本語 (`ja`)
  - Simplified Chinese — 简体中文 (`zh`)
  - Russian — Русский (`ru`)
- **🎨 Clean Light & Dark Mode Palette**:
  - Light Theme: Main Background `#F1F0E8`, Workspace Box `#EEE0C9`, Secondary Accent `#ADC4CE`, Primary Accent `#96B6C5`, Text `#1E293B`
  - Dark Theme: Background `#182026`, Surface `#222D35`, Text `#F1F0E8`

---

## 🚀 Local Development Commands

All commands are run from the root of the project:

| Command           | Action                                                       |
| :---------------- | :----------------------------------------------------------- |
| `npm install`     | Install dependencies                                         |
| `npm run dev`     | Start local development server at `http://localhost:4321`    |
| `npm run build`   | Build production static site into `./dist/`                  |
| `npm run preview` | Preview the production build locally before deploying        |

---

## 📁 Project Structure

```text
rotatevideo.github.io/
├── .github/workflows/
│   └── deploy.yml              # Official Astro GitHub Pages deployment workflow
├── public/
│   ├── .nojekyll               # Prevents GitHub Pages Jekyll processing
│   ├── favicon.svg             # Brand SVG icon
│   ├── manifest.webmanifest    # Offline PWA Web App Manifest
│   ├── og-image.svg            # 1200x630 Open Graph / Twitter preview card
│   ├── robots.txt              # Search crawler directives + dual sitemap pointers
│   ├── sitemap.xml             # Direct Google Search Console <urlset> sitemap
│   └── sw.js                   # Offline-first Service Worker
├── src/
│   ├── components/
│   │   ├── Breadcrumb.astro    # Semantic Breadcrumb navigation
│   │   ├── Footer.astro        # Site footer landmark
│   │   ├── Navbar.astro        # Ultra-responsive Navbar (Icon-only on mobile/tablet)
│   │   ├── SeoContent.astro    # How-To, VLC Comparison & FAQ Accordion
│   │   └── VideoRotator.astro  # First-fold 3-step interactive Video Rotator box
│   ├── i18n/
│   │   └── translations.ts     # Complete 8-language dictionary
│   ├── layouts/
│   │   └── BaseLayout.astro    # SEO meta, GTM/GA4, Open Graph & JSON-LD schemas
│   ├── pages/
│   │   └── index.astro         # Main application page
│   └── utils/
│       └── videoEngine.ts      # Lossless MP4 tkhd matrix patcher + Canvas re-encoder
├── astro.config.mjs            # Astro + Tailwind + @astrojs/sitemap config
├── package.json
├── tailwind.config.mjs
└── LICENSE                     # MIT License
```

---

## ☕ Support the Developer

If **Rotate Video Online** saved you time, you can support ongoing open-source development here:
👉 **[Buy the Developer a Coffee on Gumroad](https://kisharadilshan.gumroad.com/coffee)**

---

## 📄 License

Licensed under the [MIT License](./LICENSE).
