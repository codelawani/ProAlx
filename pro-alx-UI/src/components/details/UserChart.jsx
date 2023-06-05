import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, Tooltip, Legend } from 'recharts';

const getTime = value => {
	const hours = Math.floor(value / 3600);
	const minutes = Math.floor((value % 3600) / 60);
	return `${hours > 0 ? hours + 'hrs' : ''} ${minutes}mins`;
};

const updatedDataset = {};
const CustomTooltip = ({ active, payload, label, isGithubData }) => {
	if (active && payload && payload.length) {
		const tooltipItem = Object.entries(updatedDataset[payload[0].payload.name]);
		return (
			<div
				className='p-4 bg-black text-gray-300
			'
			>
				<p className='border-b py-2 mb-2 capitalize'>{`${label}`}</p>

				{!isGithubData &&
					tooltipItem.map(([key, value], index) => (
						<p key={index} className='py-1'>{`${key}: ${getTime(value)}`}</p>
					))}

				{isGithubData &&
					tooltipItem.map(([key, value], index) => (
						<p key={index} className=''>{`${key}: ${value} commits`}</p>
					))}
				{!isGithubData &&
					payload.map((entry, index) => (
						<p key={index} className='py-1'>
							{`Total: ${getTime(entry.value)}`}
						</p>
					))}
			</div>
		);
	}
	return null;
};

const UserChart = ({ value, isGithubData = false }) => {
	const screenWidth = window.innerWidth;
	const barWidth = screenWidth >= 768 ? 600 : 320;
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

	if (Object.keys(value).length === 0) {
		return (
			<p className=' text-center self-center animate-bounce text-red-950'>
				fetching stats...
			</p>
		);
	}

	return (
		<div className='w-fit'>
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
				<Bar dataKey='coding' barSize={50} fill='rgba(69, 10 ,10,0.8)' />
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
