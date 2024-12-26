/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    fontFamily: {
      poppins: ['"Poppins", sans-serif'],
      ubuntu: ['"Ubuntu", sans-serif'],
      agdasima: "Agdasima"
    },
    boxShadow: {
      patternShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;',
      toastShadow: '0 0 20px rgba(0, 0, 0, 0.3)'
    },
    keyframes: {
      slideInRight: {
        '0%': { transform: 'translateX(100%)', opacity: '0%'},
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      fadeOut: {
        '0%': { opacity: '1' },
        '100%': { opacity: '0' },
      },
      progressBar: {
        '0%': { width: '100%' },
        '100%': { width: '0%' },
      },
    },
    animation: {
      slideInRight: 'slideInRight 1s ease-out',
      fadeOut: 'fadeOut 1s ease-out',
      progressBar: 'progressBar 5s linear'
    },
  },
  plugins: [],
}