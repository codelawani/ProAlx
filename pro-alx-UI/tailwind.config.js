/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
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
          from: {
            transform: 'translate(0,0)'
          },
          to: {
            transform: 'translateY(50%, -50%)'
          }
        }
      },
      animation: {
        loader: 'loader 1s linear infinite',
        mobileMenu: 'navMenu .3s ease-in .3s'
      }
    }
  },
  plugins: []
};
