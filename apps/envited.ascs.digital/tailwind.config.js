const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')

/* eslint-disable */
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '{src,pages,components,app,modules}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      orange: colors.orange,
      yellow: colors.yellow,
      red: colors.red,
      green: colors.green,
      indigo: colors.indigo,
      blue: {
        ...colors.blue,
        800: '#798bb3',
        900: '#5a6f9f',
        DEFAULT: '#848ab7',
      },
    },
    extend: {},
  },
  plugins: [],
}
