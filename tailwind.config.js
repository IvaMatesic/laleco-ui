/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#93B48B',
          light: '#F7FFF6',
          dark: '#8491A3'
        },
        secondary: {
          DEFAULT: '#A5668B',
          light: '#D3BCC0',
          dark: '#6B2D5C',
        },
        accent: '#FF5376',  // Single custom color (no shades)
      },
    },
    fontFamily: {
      'title': ['Julius Sans One', 'sans-serif'],
      'body': ['Inria Sans', 'sans-serif'],
    },
  },
  plugins: [],
}
