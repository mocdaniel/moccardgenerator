/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      brand: "#F29D64",
      dark: "#344050",
      mid: "#C7CFDB",
      light: "#F8FAFC",
      black: "#000000",
      white: "#FFFFFF",
      red: "#FF0000",
      green: "#2e980f",
      transparent: "#ffffff00"
    },
  },
  plugins: [],
}
