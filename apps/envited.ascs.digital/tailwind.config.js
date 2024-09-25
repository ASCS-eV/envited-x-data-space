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
    extend: {
      backgroundImage: {
        pattern: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(241 245 249 / 0.03)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        logo: "url('../public/bg-logo.svg')",
      },
    },
  },
  plugins: [],
}
