/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		extend: {
			backgroundImage: {
				cool: 'linear-gradient(30deg, #6BFFBA,#BA6BFF,#FFBA6B)',
				warm: 'linear-gradient(to right,#FFBA6B, #6BFFBA)',
			},
			borderRadius: {
				double: '100% 50%',
			},
			content: {
				hero: 'url("../src/assets/person2.png")',
			},
			colors: {
				dark: '#0f0f10',
				main: '#ff8906',
				body: '#fffffe',
				blur: '#333333',
				mood: 'rgba(0,0,0,0.9)',
				'dark-hero': '#23162b',
				waka: '#1d1e28',
				yellow: '#E1FF6B',
				'warm-tone': '#FFBA6B',
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
		},
	},
	plugins: [],
};
