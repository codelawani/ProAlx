import { Bar } from 'react-chartjs-2';
import localDataMgr from '../../hooks/localDataMgr';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const User = ({ value }) => {
  const user = localDataMgr.get('user');
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ];

  const labels = Object.keys(value);
  const weekDay = labels.map(day => {
    const date = new Date(day);
    const currentDay = date.getDay();
    return days[currentDay];
  });
  const allKeys = new Set();
  labels.forEach(label => {
    Object.keys(value[label]).forEach(key => allKeys.add(key));
  });

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const datasets = Array.from(allKeys).map(key => ({
    label: key,
    data: labels.map(label => value[label][key] || 0),
    backgroundColor: getRandomColor()
  }));

  const data = {
    labels: weekDay,
    datasets: datasets
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: value => {
            const hours = Math.floor(value / 3600);
            return `${hours} hrs`;
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false,
        position: 'right'
      },
      title: {
        display: true,
        text: `${user} stats`
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const hours = Math.floor(value / 3600);
            const minutes = Math.floor((value % 3600) / 60);
            const final = `${hours}hrs ${minutes}min`;
            return `${tooltipItem.dataset.label}: ${final}`;
          }
        }
      }
    }
  };

  return (
    <div className='w-full'>
      <p>Welcome {user}</p>
      <div className=''>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

User.propTypes = {
  value: PropTypes.object.isRequired
};

export default User;
