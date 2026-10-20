/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        coral: {
          500: '#ff4b5c',
          600: '#e03e4d',
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#0b0f19',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 20px 40px -15px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 25px -5px rgba(225, 29, 72, 0.3)',
      }
    },
  },
  plugins: [],
}
