import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rotatevideo.github.io',
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date('2026-11-15'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
