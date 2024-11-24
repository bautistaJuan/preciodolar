/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Define los colores que quieras usar en modo oscuro
        dark: {
          background: "#1a1a1a", // Color de fondo en modo oscuro
          text: "#ffffff", // Color de texto en modo oscuro
        },
      },
    },
  },
  darkMode: "class", // Habilita el modo oscuro usando una clase
  plugins: [],
};
