/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px'
      },
      colors: {
        primary: {
          DEFAULT: '#93B48B',
          hover: '#85a67b',
          disabled: '#baccb0',
          light: '#F7FFF6',
          dark: '#8491A3'
        },
        secondary: {
          DEFAULT: '#A5668B',
          hover: '#c05e93',
          disabled: '#bda0b3',
          light: '#D3BCC0',
          dark: '#6B2D5C',
        },
        disabled:'#f3f3f3',
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
