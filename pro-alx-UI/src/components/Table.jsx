import PropTypes from 'prop-types';

const Table = ({ data }) => {
  return (
    <table className='max-w-full divide-y divide-red-950'>
      <thead>
        <tr className='text-xs text-left text-gray-500 font-medium uppercase tracking-wider'>
          <th className='py-3 px-3 w-1/6'>Name</th>
          <th className='py-3 px-3 w-1/12'>Daily Average</th>
          <th className='py-3 px-1 w-1/12'>request</th>
          <th className='py-3 px-3 w-1/12 hidden sm:table-cell'>Total Hours</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className='cursor-pointer text-black whitespace-nowrap dark:text-white dark:bg-black dark:hover:bg-red-950 hover:bg-red-950 hover:text-white transition-colors duration-200'>
            <td className='py-4 px-3 w-1/6'>
              <div className='flex items-center'>
                <img src={row.photo_url} alt={row.name} className='w-10 h-10 rounded-full' />
                <span className='ml-2 truncate text-blue-400 group-hover:text-white hover:underline cursor-pointer'>{row.name}</span>
              </div>
            </td>
            <td className='py-4 px-3 w-1/12 align-middle'>{formatTotalHours(row.waka_week_daily_average)}</td>
            <td className='py-4 px-6 w-1/12 align-middle'>{row.requested_partners}</td>
            <td className='py-4 px-3 w-1/12 hidden sm:table-cell'>{formatTotalHours(row.waka_week_total_seconds)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const formatTotalHours = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}hrs ${minutes}mins`;
};

Table.propTypes = {
  data: PropTypes.array
};

export default Table;
