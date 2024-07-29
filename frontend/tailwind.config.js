/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: '#AFBEE3',
        customPink: '#FBDADA',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #AFBEE3, #FBDADA)',
      }
    },
  },
  plugins: [],
}

