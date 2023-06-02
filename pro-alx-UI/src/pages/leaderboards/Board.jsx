import PropTypes from 'prop-types';

const Board = ({ rank, name, hours, average, handleClick }) => {
  const getTime = seconds => {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    return `${hour}hrs ${minute}mins`;
  };

  return (
    <tr className='grid grid-cols-7 content-center border-b dark:border-blur last:border-none py-3 md:gap-9 '>
      <td className='text-center col-span-1'>{rank}</td>
      <td
        className='text-center text-blue-500 dark:text-blue-300 cursor-pointer col-span-2'
        onClick={() => handleClick(rank)}
      >
        {name}
      </td>
      <td className='text-center col-span-2'>{getTime(hours)}</td>
      <td className='text-center col-span-2'>{getTime(average)}</td>
    </tr>
  );
};

Board.propTypes = {
  rank: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  hours: PropTypes.number.isRequired,
  average: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default Board;
