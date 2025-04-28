/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily:{
        sans:["Poppins","sans-serif"],
        custom:["Plaster","Plaster"]
      },
      gridTemplateColumns:{
        "70/30":"70% 28%"
      },
      colors: {
        'custom-orange': '#fb6b35',
        'custom-light-orange': '#FAE1CB',
      },
    }
  },
  plugins: [],
}

