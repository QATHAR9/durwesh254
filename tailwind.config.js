/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF8E6',
          100: '#F7F0CD',
          200: '#F0E19B',
          300: '#E8D269',
          400: '#E1C337',
          500: '#D9B505', // Main gold
          600: '#AE9104',
          700: '#826D03',
          800: '#574802',
          900: '#2B2401',
        },
        black: {
          50: '#E6E6E6',
          100: '#CCCCCC',
          200: '#999999',
          300: '#666666',
          400: '#333333',
          500: '#000000', // Pure black
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};