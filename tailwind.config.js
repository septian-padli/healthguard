/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        green: {
          darker: '#425921',
          dark: '#8DBF46',
          normal: '#BCFE5D',
          light: '#F8FFEF',
        },
      },
    },
  },
  plugins: [],
}