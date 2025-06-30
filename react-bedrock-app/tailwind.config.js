// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // この行を追加
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}