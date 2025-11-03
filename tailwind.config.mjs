/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{ts,tsx,js,jsx}"
  ],
  // Use class strategy so toggling the `dark` class works at runtime
  darkMode: "class",
  theme: {
    extend: {}
  },
  plugins: []
};
