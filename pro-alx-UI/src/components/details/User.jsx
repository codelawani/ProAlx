import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import styles from './users.module.css';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'right',
		},
		title: {
			display: true,
			text: '<User> stats',
		},
	},
};

const User = ({ name, dataset, labels }) => {
	const data = {
		labels: labels,
		datasets: [
			{
				label: 'time spent(hrs)',
				data: dataset,
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};

	return (
		<div>
			<p>{name}</p>
			<div className={styles.user_chart}>
				<Bar options={options} data={data} />
			</div>
		</div>
	);
};

User.propTypes = {
	name: PropTypes.string,
	dataset: PropTypes.array,
	labels: PropTypes.array,
};

export default User;