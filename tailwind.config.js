/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: '#FF4D00',
        electric: '#0028FF',
        acid: '#E8FF00',
        signal: '#FF0022',
        cobalt: '#0057FF',
        ink: '#0A0A0A',
      },
      fontFamily: {
        display: ['Arial Black', 'Impact', 'sans-serif'],
        body: ['Helvetica Neue', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
