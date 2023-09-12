/** @type {import('tailwindcss').Config} */

// const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  theme: {
    darkMode: false,
    extend: {
      fontFamily: {
        "sp-pro-text-light": ['sp-pro-text-light', 'sans-serif'],
        "sp-pro-text-light": ['sp-pro-text-light', 'sans-serif'],
        "sp-pro-text-regular": ['sp-pro-text-regular', 'sans-serif'],
        "sp-pro-text-bold": ['sp-pro-text-bold', 'sans-serif'],
        "sp-pro-text-medium": ['sp-pro-text-medium', 'sans-serif'],
        "sp-pro-text-semibold": ['sp-pro-text-semibold', 'sans-serif'],
        "sp-pro-text-heavy": ['sp-pro-text-heavy', 'sans-serif'],
      },
      colors: {
        "primary": "#F8C400",
        "pending-hover": "#f2c005",
        "secondary": "#3A3A3A",
        "text-color": "#324C5B",
        "accept": "#6DB33F",
        "reject": "#C52222",
        "reject-light": "#FFC5C5",
        "reject-light": "#FFC5C5",
        "pending": "#F8C400",
        "info": "#4583FB",
        "bg-primary": "#F4F4F4",
        "bg-secondary": "#FEFCFB",
        "bg-primary-strock": "#D0D5DD",
        "bg-primary-strock": "#D0D5DD",
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'light-green': 'rgba(60, 179, 113, 20%)',
        'light-green': 'rgba(60, 179, 113, 20%)',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
        "border-strock": "#E1E9EE",
        "error": "#EE1D52",
        "bg-color": "#FAFBFC",
        "sidebar": "rgb(111 115 151)",
        "bg-main": "#F7F8FC",
        "custom-red": "#FF6D5C",
        "custom-blue": "#B3E67B",
        "white": "#FFFFFF",
        "shadow": "#FFD2B3",
        "border-strock": "#E1E9EE",
        "error": "#EE1D52",
        "bg-color": "#FAFBFC",
        "sidebar": "rgb(111 115 151)",
        "bg-main": "#F7F8FC",
        "custom-red": "#FF6D5C",
        "custom-blue": "#B3E67B",
        "white": "#FFFFFF",
        "shadow": "#FFD2B3",
        "hover-yellow": "#FFD300",
        "blue-light": "#2076FF",
        "blue-light": "#2076FF",
        "secondary-yellow": "#F8C400",
        "bg-pink": "#FEFCFB",
        "text-black": "#111827",
        "border-gray-light": "#edf2f7",
        "custom-yellow-showdow-light": "#FEFAE8",
        "bg-feature": "#F4F4F4",
        "custom-menu": "#737791",
        "bg-pink": "#FEFCFB",
        "text-black": "#111827",
        "border-gray-light": "#edf2f7",
        "custom-yellow-showdow-light": "#FEFAE8",
        "bg-feature": "#F4F4F4",
        "custom-menu": "#737791",
        "custom-midnight-blue": "#003F7D"
      },
      screens: {
        '2xl' : '1536px',
        '3xl': '1900px',
        'lt-14' : '1366px',
        'lt-15' : '1440px',
        'lt-16' : '1728px'
      },
      zIndex: {
        '60' : '60',
        '70' : '70',
        '80' : '80',
        '90' : '90',
        '100': '100'
      }
    },

  },
  plugins: [require("daisyui"), require('@headlessui/tailwindcss'),  require('tailwind-scrollbar')({ nocompatible: true })],
  daisyui: {
    themes: false,
  }
}

