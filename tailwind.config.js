/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'icon': ['BwModelica', 'ui-sans-serif', 'system-ui'],
      'body': ['ExensaGrotesk', 'ui-sans-serif', 'system-ui'],
    },
    screens: {
      'xs': '428px',
      // => @media (min-width: 428px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'darkOpaque': 'rgba(0,0,0,0.8)',
        'dark': '#212224',
        'light': '#DDD5CB',
        'blue': '#63A0E8'
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '8': 'repeat(8, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        'auto': 'repeat(auto-fill, 1fr)',

        // Complex site-specific row configuration
        'layout': '200px minmax(900px, 1fr) 100px',
      }
    },
  },
  plugins: [],
}