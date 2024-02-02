/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx", "./src/**/*.tsx", "./src/**/*.js"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        "bg-green-dark": "#013A29",
        yellow: "#FEDA7C",
        beige: "#FFF6ED",
        orange: "#FB7E3E",
        'custom-green': '#013A29',
      },
      keyframes: {
        btn_hover: {
          "0%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        btn_hover: "btn_hover 1s ease-in-out infinite",
      },
    },
  },
};



