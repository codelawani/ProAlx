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
		},
	},
	plugins: [],
};
