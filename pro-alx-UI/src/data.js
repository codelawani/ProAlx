import wakatimeDashboard from './assets/stats.png';
import test from './assets/sample.png';
import dashboard from './assets/dashboard.png';
import chart from './assets/chart.png';

export const reviews = [
	{
		id: 0,
		name: 'John Doe',
		text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias doloribus soluta inventore laborum. Exercitationem porro, dolores ut modi non, repellat dolore quas at commodi obcaecati harum culpa et maiores provident.',
		img: test,
	},
	{
		id: 1,
		name: 'Jane Doe',
		text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias doloribus soluta inventore laborum. Exercitationem porro, dolores ut modi non, repellat dolore quas at commodi obcaecati harum culpa et maiores provident.',
		img: test,
	},
	{
		id: 2,
		name: 'John Smith',
		text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias doloribus soluta inventore laborum. Exercitationem porro, dolores ut modi non, repellat dolore quas at commodi obcaecati harum culpa et maiores provident.',
		img: test,
	},
];

export const proalx = [
	{
		id: 0,
		text: 'By seamlessly integrating their Wakatime statistics, we offer you an unparalleled opportunity to delve into the depths of their commitment to coding and learning.',
		img: chart,
		alt: 'A snapshot of our dashboard',
	},
	{
		id: 1,
		text: 'Choose a partner from your cohort easily using our partner finding list',
		img: dashboard,
		alt: 'A snapshot showing the partner list of our dashboard',
	},

	{
		id: 2,
		text: "Integrating Wakatime into your preferred code editor is easy. Just follow our clear guide on how to setup wakatime in your preferred editor to unlock the full potential of Wakatime's features.",
		alt: 'snapshot of wakatime dashboard statistics',
		img: wakatimeDashboard,
	},
	// {
	// 	id: 3,
	// 	text: 'Experience enhanced productivity, transparency, and embark on a journey of mutual growth and shared coding aspirations.',
	// 	alt: '',
	// 	img: '',
	// },
];

export const teamProjects = [
	'0x11. C - printf',
	'0x19. C -Stacks,Queues - LIFO, FIFO',
	'0x1B. C - sorting algorithms & Big O',
	'0x1D. C - Binary trees',
	'0x16. C - Simple Shell',
	'0x09. Web infrastructure design',
	'0x00. AirBnB_clone - The console',
	'0x02. AirBnB_clone - MySQL',
	'0x05. AirBnB_clone - Restful Api',
	'0x06. AirBnB_clone - Web dynamic',
	'Research & project approval',
];

export const dataset = {
	'2023-05-14': {
		'alx-higher_level': 9238.773577,
		'alx-system_devops': 299.72227,
		printf: 7119.960505,
	},
	'2023-05-15': {
		AirBnB_clone_v2: 2220.406212,
		AirBnB_clone_v3: 10175.88833,
	},

	'2023-05-16': {
		'alx-system_engineering': 18196.040971,
		'alx-low_level': 2903.1054,
		AirBnB_clone: 11766.9124,
	},
	'2023-05-17': {
		'alx-higher_level': 9238.773577,
		'alx-system_devops': 299.72227,
		printf: 7119.960505,
	},
	'2023-05-18': {
		AirBnB_clone_v2: 2220.406212,
		AirBnB_clone_v3: 10175.88833,
	},

	'2023-05-19': {
		'alx-system_engineering': 18196.040971,
		'alx-low_level': 2903.1054,
		AirBnB_clone: 11766.9124,
	},
	'2023-05-20': {
		'alx-system_engineering': 18196.040971,
		'alx-low_level': 2903.1054,
		AirBnB_clone: 11766.9124,
	},
};
