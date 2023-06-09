import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, Tooltip, Legend } from 'recharts';
import { useState, useLayoutEffect } from 'react';

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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let barWidth = null;
  if (screenWidth < 600) {
    barWidth = 320;
  } else if (screenWidth < 1200) {
    barWidth = 500;
  } else {
    barWidth = 600;
  }

  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ];

  const getDate = value => {
    const date = new Date(value);
    const currentDay = date.getDay();
    return days[currentDay];
  };

  const data = Object.entries(value).map(([date, values]) => {
    return {
      name: getDate(date),
      coding: Object.values(values).reduce((sum, num) => sum + num, 0)
    };
  });

  Object.keys(value).forEach(key => {
    updatedDataset[getDate(key)] = value[key];
  });

  return (
    <div className='w-fit bg-chart dark:bg-chart rounded'>
      <BarChart
        width={barWidth}
        height={500}
        data={data}
        margin={{
				  top: 5,
				  right: 5,
				  left: 5,
				  bottom: 5
        }}
      >
        <XAxis dataKey='name' tick={{ fill: 'white' }} />
        <Tooltip content={<CustomTooltip isGithubData={isGithubData} />} />
        <Legend />
        <Bar dataKey='coding' barSize={30} fill='#9CA2D2' />
      </BarChart>
    </div>
  );
};

CustomTooltip.propTypes = {
  payload: PropTypes.array,
  active: PropTypes.bool,
  label: PropTypes.string,
  isGithubData: PropTypes.bool
};

UserChart.propTypes = {
  value: PropTypes.object.isRequired,
  isGithubData: PropTypes.bool
};

export default UserChart;
