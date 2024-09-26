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
        logo: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' id='Layer_1' x='0px' y='0px' viewBox='0 0 295.2 60' style='enable-background:new 0 0 295.2 60;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23FFFFFF;%7D %3C/style%3E%3Cpath class='st0' d='M297.6,0v5.6h-0.1c-13.5,0-26.5,5-36.1,13.9l-26.1,24.2c-9.6,8.9-22.6,13.9-36.1,13.9H96.1 c-13.6,0-26.5-5-36.1-13.9l-26-24.2C24.3,10.6,11.3,5.6-2.2,5.6h-0.1V0H297.6z'%3E%3C/path%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [],
}
