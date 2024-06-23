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

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/**/*.html', './src/**/*.vue'],
  safelist: [
    {
      pattern: /col-(start|end)-(.)*/,
    },
  ],
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
