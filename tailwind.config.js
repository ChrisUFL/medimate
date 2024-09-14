/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./resources/**/*.blade.php",
      "./resources/**/*.js",
      "./resources/**/*.jsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home': "url('/static/images/homebg.png')",
      }
    },
  },
  plugins: [],
}

