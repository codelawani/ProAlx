import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, Tooltip, Legend } from 'recharts';

const getTime = value => {
	const hours = Math.floor(value / 3600);
	const minutes = Math.floor((value % 3600) / 60);
	return `${hours}hrs ${minutes}mins`;
};

const updatedDataset = {};
const CustomTooltip = ({ active, payload, label, isGithubData }) => {
	if (active && payload && payload.length) {
		const tooltipItem = Object.entries(updatedDataset[payload[0].payload.name]);
		return (
			<div className='p-3 bg-black text-white'>
				<p className=''>{`${label}`}</p>

				{!isGithubData &&
					tooltipItem.map(([key, value], index) => (
						<p key={index} className=''>{`${key}: ${getTime(value)}`}</p>
					))}

				{isGithubData &&
					tooltipItem.map(([key, value], index) => (
						<p key={index} className=''>{`${key}: ${value} commits`}</p>
					))}
				{!isGithubData &&
					payload.map((entry, index) => (
						<p key={index}>{`Total: ${getTime(entry.value)}`}</p>
					))}
			</div>
		);
	}
	return null;
};

const UserChart = ({ value, isGithubData = false }) => {
	const screenWidth = window.innerWidth;
	const barWidth = screenWidth >= 768 ? 700 : 350;
	const days = [
		'sunday',
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
	];

	const getDate = value => {
		const date = new Date(value);
		const currentDay = date.getDay();
		return days[currentDay];
	};

	const data = Object.entries(value).map(([date, values]) => {
		return {
			name: getDate(date),
			coding: Object.values(values).reduce((sum, num) => sum + num, 0),
		};
	});

	Object.keys(value).forEach(key => {
		updatedDataset[getDate(key)] = value[key];
	});

	return (
		<div className=''>
			<BarChart
				width={barWidth}
				height={400}
				data={data}
				margin={{
					top: 5,
					right: 5,
					left: 5,
					bottom: 5,
				}}
			>
				<XAxis dataKey='name' />
				<Tooltip content={<CustomTooltip isGithubData={isGithubData} />} />
				<Legend />
				<Bar dataKey='coding' barSize={50} fill='#0f0e17' />
			</BarChart>
		</div>
	);
};

CustomTooltip.propTypes = {
	payload: PropTypes.array,
	active: PropTypes.bool,
	label: PropTypes.string,
	isGithubData: PropTypes.bool,
};

UserChart.propTypes = {
	value: PropTypes.object.isRequired,
	isGithubData: PropTypes.bool,
};

export default UserChart;
