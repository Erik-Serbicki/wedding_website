/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          primary: '#d4af37',
          secondary: '#f8f6f0',
          accent: '#8b7355',
        }
      }
    },
  },
  plugins: [],
}
