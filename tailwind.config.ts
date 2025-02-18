import type { Config } from 'tailwindcss'

export default {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ec6126',
        black: '#0a0a0a',
        white: '#ffffff',
        pink: '#f63b3b',
        purple: '#f63bc7',
        blue: '#3b64f6',
        red: '#FF4040',
        gray: {
          100: '#ececec',
          200: '#a7a7a7',
          300: '#797979',
          400: '#4d4d4d',
          500: '#363636',
          600: '#1d1d1d',
        },
      },
      fontFamily: {
        font: ['var(--font-pretend)', 'sans-serif'],
      },
      spacing: {
        header_h: '80px',
        section_w: '1000px',
      },
    },
  },
  plugins: [],
} satisfies Config
