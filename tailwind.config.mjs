/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#96B6C5',
          secondary: '#ADC4CE',
          surface: '#EEE0C9',
          bgLight: '#F1F0E8',
          bgDark: '#182026',
          surfaceDark: '#222D35',
          textLight: '#1E293B',
          textDark: '#F1F0E8',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
