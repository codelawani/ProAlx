/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				dark: '#0f0e17',
				main: '#ff8906',
				body: '#fffffe',
			},
			keyframes: {
				loader: {
					to :{transform : 'rotate(360deg)'}
				}
			},
			animation: {
				loader: 'loader 1s linear infinite'
			}
		},
	},
	plugins: [],
};
