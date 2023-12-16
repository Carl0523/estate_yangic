/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(82, 89, 212)",
        alertFont: "rgb(193, 113, 112)",
        alertContainer: "rgb(244, 237, 236)",
        overlay: "rgba(0, 0, 0, 0.6)"
      },
      screens: {
        xs: "400px",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
      },
      boxShadow: {
        leftShadow: "-2px 0 5px 5px gray",
        card: "0 0 18px rgba(0, 0, 0, 0.7)"
      },
      borderRadius: {
        inputRadius: "0.125rem",
        buttonRadius: "0.375rem"
      }
    },
  },
  plugins: [],
};
