import PropTypes from 'prop-types';
import { useUser } from '../../hooks/UseUserContext';
import { BarChart, Bar, XAxis, Tooltip, Legend } from 'recharts';

const getTime = value => {
	const hours = Math.floor(value / 3600);
	const minutes = Math.floor((value % 3600) / 60);
	return `${hours}hrs ${minutes}mins`;
};

const updatedDataset = {};
const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		const tooltipItem = Object.entries(updatedDataset[payload[0].payload.name]);
		console.log(typeof active);
		return (
			<div className='p-3 bg-black text-white'>
				<p className=''>{`${label}`}</p>

				{tooltipItem.map(([key, value], index) => (
					<p key={index} className=''>{`${key}: ${getTime(value)}`}</p>
				))}
				{payload.map((entry, index) => (
					<p key={index}>{`Total: ${getTime(entry.value)}`}</p>
				))}
			</div>
		);
	}
	return null;
};

const UserChart = ({ value, isGithubData = false }) => {
	const { user } = useUser();
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
			<p>Welcome {user.name}</p>
			<div>
				<BarChart
					width={700}
					height={400}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<XAxis dataKey='name' />
					<Tooltip content={<CustomTooltip />} />
					<Legend />
					<Bar dataKey='coding' barSize={50} fill='#0f0e17' />
				</BarChart>
			</div>
		</div>
	);
};

CustomTooltip.propTypes = {
	payload: PropTypes.array,
	active: PropTypes.bool,
	label: PropTypes.string,
};

UserChart.propTypes = {
	value: PropTypes.object.isRequired,
	isGithubData: PropTypes.bool,
};

export default UserChart;
