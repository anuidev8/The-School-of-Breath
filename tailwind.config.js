import { nextui } from "@nextui-org/react"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js,tsx,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'main': '#211B71',
        'secondary':'#FF914C'
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],

}

