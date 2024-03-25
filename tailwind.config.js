/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        customfont: ["CustomFont", "sans-serif"],
      },
    },
  },
  plugins: [],
};
