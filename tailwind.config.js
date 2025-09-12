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
      fontFamily: {
        jakartaExtraLight: ['jakartaExtraLight'],
        jakartaLight: ['jakartaLight'],
        jakartaRegular: ['jakartaRegular'],
        jakartaMedium: ['jakartaMedium'],
        jakartaSemiBold: ['jakartaSemiBold'],
        jakartaBold: ['jakartaBold'],
        jakartaExtraBold: ['jakartaExtraBold'],
        jakartaBlack: ['jakartaExtraBlack'],
        latoThin: ['latoThin'],
        latoLight: ['latoLight'],
        latoRegular: ['latoRegular'],
        latoBold: ['latoBold'],
        latoBlack: ['latoBlack'],
        sans: ['jakartaRegular'],
      },
    },
  },
  plugins: [],
}