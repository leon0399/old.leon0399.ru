/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    container: {
      padding: '15px',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E81E62',
          50: '#FDEEF3',
          100: '#FBD7E3',
          200: '#F6A9C3',
          300: '#F17BA3',
          400: '#ED4C82',
          500: '#E81E62',
          600: '#BF144D',
          700: '#910F3B',
          800: '#630A28',
          900: '#350515',
        },
        dark: '#212121',
        light: '#E5E5E5',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Open Sans"',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  variants: {},
  plugins: [],
}
