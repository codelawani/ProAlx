import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const BoardList = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = id => {
    navigate(`/user/${id}`);
  };

  const getTime = seconds => {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    return `${hour > 0 ? hour + 'hrs' : ''} ${minute}mins`;
  };

  const BoardItems = data?.map((item, index) => {
    return (
      <tr
        className='grid grid-cols-7 content-center border-b dark:border-blur last:border-none py-[1.5rem] md:gap-9 border-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:rounded-lg'
        key={item.id}
      >
        <td className='text-center col-span-1'>{index + 1}</td>
        <td
          className='text-center text-blue-500 dark:text-blue-300 cursor-pointer col-span-2'
          onClick={() => handleClick(item.id)}
        >
          {item.name}
        </td>
        <td className='text-center col-span-2'>
          {item.waka_week_total_seconds
					  ? getTime(item.waka_week_total_seconds)
					  : '-'}
        </td>
        <td className='text-center col-span-2'>
          {item.waka_week_daily_average
					  ? getTime(item.waka_week_daily_average)
					  : '-'}
        </td>
      </tr>
    );
  });

  return (
    <table className='table-auto flex flex-col'>
      <thead className=''>
        <tr className='grid grid-cols-7 content-center font-mono font-normal uppercase text-sm'>
          <th className='col-span-1 font-normal'>Rank</th>
          <th className='col-span-2 '>Fullname</th>
          <th className='col-span-2'>Hours</th>
          <th className='col-span-2'>Average</th>
        </tr>
      </thead>

      <tbody>{BoardItems}</tbody>
    </table>
  );
};
BoardList.propTypes = {
  data: PropTypes.array
};

export default BoardList;
