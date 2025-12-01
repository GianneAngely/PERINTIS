/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "forest-dark": "#1a3a2e",
        "forest-main": "#2d5f3f",
        "forest-light": "#4a8b5f",
        "forest-pale": "#7cb98f",
        gold: "#d4af37",
        "gold-light": "#f0d78c",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
      },
      animation: {
        blob: "blob 7s infinite",
        "bounce-slow": "bounce 3s infinite",
        fadeIn: "fadeIn 0.8s ease-in forwards",
        stroke: "stroke 1s ease-in-out forwards",
        fill: "fill 0.6s ease-in-out forwards",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        stroke: {
          "0%": {
            strokeDashoffset: "300",
          },
          "100%": {
            strokeDashoffset: "0",
          },
        },
        fill: {
          "0%": {
            opacity: "0",
            transform: "scale(0.8)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
