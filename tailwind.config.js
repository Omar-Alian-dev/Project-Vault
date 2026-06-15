/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vault: {
          bg: "#0F0F23",
          primary: "#8B5CF6",
          secondary: "#A78BFA",
          cta: "#FBBF24",
          text: "#F8FAFC",
        }
      },
      fontFamily: {
        heading: ["Orbitron", "sans-serif"],
        body: ["Exo 2", "sans-serif"],
      }
    },
  },
  plugins: [],
};
