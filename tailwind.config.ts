import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]'], // Support Docusaurus dark mode
} satisfies Config;
