/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#F4F6F7",  // Background color
        soft: "#E3E6EA",   // Card background
        medium: "#CAD1D7", // Input background
        border: "#A5B0BB", // Borders
        highlight: "#798897", // Focus ring & placeholders
        primary: "#5D6C7D", // Headings & buttons
        dark: "#505C6A",  // Button hover & text
        deep: "#454E59",  // Darkest text
      },
    },
  },
  plugins: [],
}

