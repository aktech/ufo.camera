/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'passion-one': ['Passion One', 'cursive'],
        'merriweather-sans': ['Merriweather Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
