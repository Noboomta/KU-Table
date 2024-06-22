const gridConfig = () => {
  const gridColumnStart = {}
  const gridColumnEnd = {}
  const gridTemplateColumns = { 168: 'repeat(168, minmax(0, 1fr))' }

  for (let i = 14; i <= 169; i++) {
    gridColumnStart[i.toString()] = i.toString()
    gridColumnEnd[i.toString()] = i.toString()
  }

  return { gridTemplateColumns, gridColumnStart, gridColumnEnd }
}

const getGridClass = () => {
  const result = []

  for (let i = 14; i <= 169; i++) {
    result.push(`col-start-${i}`, `col-end-${i}`)
  }

  return result
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.vue'],
  safelist: getGridClass(),
  darkMode: 'selector', // or 'media' or 'class'
  theme: {
    extend: {
      ...gridConfig(),
      minHeight: (theme) => ({
        ...theme('spacing'),
      }),
      minWidth: {
        1000: '1000px',
      },
      hidden: {},
    },
  },
  plugins: [],
}
