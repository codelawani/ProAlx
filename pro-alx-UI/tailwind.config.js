/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      content: {
        hero: 'url("../src/assets/person2.png")'
      },
      colors: {
        dark: '#0f0e17',
        main: '#ff8906',
        body: '#fffffe',
        blur: '#333333',
        mood: 'rgba(0,0,0,0.9)'
      },
      keyframes: {
        loader: {
          to: { transform: 'rotate(360deg)' }
        },
        navMenu: {
          '0%': { transform: 'scaleY(0)' },
          '50%': { transform: 'scaleY(1.2)' },
          '100%': { transform: 'scaleY(1)' }
        }
      },
      animation: {
        loader: 'loader 1s linear infinite',
        nav: 'navMenu 0.5s linear forwards'
      }
    }
  },
  plugins: []
};
