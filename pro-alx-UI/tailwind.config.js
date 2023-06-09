/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		extend: {
			backgroundImage: {
				cool: 'linear-gradient(30deg, #6BFFBA,#BA6BFF,#FFBA6B)',
				chart: 'linear-gradient(30deg, #5052a5,#010414)',
				warm: 'linear-gradient(to right,#FFBA6B, #6BFFBA)',
			},
			borderRadius: {
				double: '100% 50%',
			},
			colors: {
				dark: '#0f0f10',
				main: '#FBFBFB',
				body: '#eaecf0',
				blur: '#333333',
				mood: 'rgba(0,0,0,0.9)',
				'dark-hero': '#23162b',
				waka: '#1d1e28',
				yellow: '#E1FF6B',
				'warm-tone': '#FFBA6B',
				'gray-ul': '#f7f7f8',
				primary: '#434343',
				'dark-blue': '#2e3192',
				bar: '#010414',
				'bar-light': 'rgba(1,4,20,0.4)',
				'bar-dark': '#5052a5',
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
			},
			keyframes: {
				loader: {
					to: { transform: 'rotate(360deg)' },
				},
				navMenu: {
					'0%': { transform: 'scaleY(0)' },
					'50%': { transform: 'scaleY(1.2)' },
					'100%': { transform: 'scaleY(1)' },
				},
				bouncy: {
					'0%': { tranform: 'translate(0px,0px) scale(1)' },
					'33%': {
						transform: 'translate(30px, -50px)  scale(1.2)',
					},
					'66%': { transform: 'translate(-20px, 30px)  scale(0.8)' },
					'100%': { transform: 'translate(0px, 0px)  scale(1)' },
				},
			},
			animation: {
				loader: 'loader 1s linear infinite',
				nav: 'navMenu 0.5s linear forwards',
				bouncy: 'bouncy 9s ease-in-out infinte',
			},
			boxShadow: {
				ul: '0px 4px 6px -2px rgba(46, 49, 146, 0.06), 0px 2px 4px -2px rgba(231, 215, 215, 0.06);',
			},
			screens: {
				ml: '970px',
			},
		},
	},
	plugins: [],
};
