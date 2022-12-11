/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // primary: '#FBC98F',
        // primary: '#fbbf24',
        primary: '#fb923c',
        secondary: '#8443EE',
      },
    },
  },
  plugins: [],
};
