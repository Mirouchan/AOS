 

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#F4B400",
          background: "#F8FAF7",
          text: "#1F2933",
        },
        dark: {
          primary: "#FACC15",
          background: "#0F172A",
          text: "#F1F5F9",
        },
      },
    },
  },
  plugins: [],
};