/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B9D',
        secondary: '#4A90E2',
        accent: '#7ED321',
        dark: '#2C3E50',
        light: '#F5F7FA',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
