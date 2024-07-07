/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'weather-orange': '#ff8000',
        'weather-orange-dark': '#e67300',
        'weather-peach': {
          200: '#FFDAB9',
          300: '#FFA07A',
        },
        'weather-red': '#FF4500',
        'weather-tomato': '#FF6347',
      },
      fontSize: {
        'weather-temp': '3rem',
        'weather-desc': '1.25rem',
      },
      borderRadius: {
        'weather-card': '1.5rem',
      },
      width: {
        'weather-card': '18rem',
      },
      boxShadow: {
        'weather-card': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}