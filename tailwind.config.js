/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#E9F3FF",
        second: "#E9F3FF7D",
        error: "#E34F27",
        text: "#273369",
        first: "#5E79C1",
        border: "#3B52A8",
        button: "#F6A603",
      },
    },
  },
  plugins: [],
};
