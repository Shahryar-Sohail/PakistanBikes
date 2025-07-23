/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js", // 👈 must include this
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // 👈 plugin included
    require("daisyui") // 👈 plugin included
  ],
}