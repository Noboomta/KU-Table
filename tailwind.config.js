const gridConfig = () => {
  const gridColumnStart = {}
  const gridColumnEnd = {}
  const gridTemplateColumns = { '26': 'repeat(26, minmax(0, 1fr))' }

  for (let i = 14; i <= 27; i++) {
    gridColumnStart[i.toString()] = i.toString()
    gridColumnEnd[i.toString()] = i.toString()
  }

  return { gridTemplateColumns, gridColumnStart, gridColumnEnd }
}

module.exports = {
    purge: [
      './public/**/*.html',
      './src/**/*.vue',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        ...gridConfig(),
        minHeight: (theme) => ({
          ...theme('spacing')
        }),
        minWidth: {
          '1000': '1000px'
        }
      }
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
