import type { Config } from 'tailwindcss'

export default {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ec6126',
        black: '#0a0a0a',
        white: '#ffffff',
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
        header: '80px',
      },
    },
  },
  plugins: [],
} satisfies Config
