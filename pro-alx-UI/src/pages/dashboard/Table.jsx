import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/customContexts';

const Table = ({ data }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleNavigation = id => {
    const url = user.id === id ? '/profile' : `/user/${id}`;
    navigate(url);
  };

  return (
    <table className='table-auto flex flex-col divide-y divide-bar dark:divide-bar-dark'>
      <thead>
        <tr
          className='grid grid-cols-7 sm:grid sm:grid-cols-9 content-center
        text-xs text-center text-gray-500 font-medium uppercase tracking-wider pb-3'
        >
          <th className='col-span-3 text-left pl-5 md:col-span-3'>Name</th>
          <th className='col-span-2 '>Daily Avg</th>
          <th className=' col-span-2'>project</th>
          <th className='sm:col-span-2 basis-1/5 hidden sm:table-cell'>
            Total Hours
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((row, index) => (
          <tr
            key={index}
            className='cursor-pointer text-black whitespace-nowrap dark:text-white dark:bg-black dark:hover:bg-bar hover:bg-bar hover:text-white transition-colors duration-200 bg-white items-center grid grid-cols-7 sm:grid-cols-9 content-center py-4 px-3 text-xs md:text-sm text-center gap-3'
            onClick={() => handleNavigation(row.id)}
          >
            <td className='col-span-3 flex items-center gap-2'>
              <img
                src={row.photo_url}
                alt={row.name}
                className='w-8 flex-none h-8 block rounded-full'
              />
              <span className=' group-hover:text-white hover:underline truncate'>
                <span className=''>{row.name}</span>
              </span>
            </td>
            <td className='col-span-2 align-middle'>
              {row?.waka_week_daily_average
							  ? formatTotalHours(row.waka_week_daily_average)
							  : '-'}
            </td>
            <td className='col-span-2 truncate'>{row.requested_project}</td>
            <td className='sm:col-span-2 sm: text-center hidden sm:table-cell'>
              {row?.waka_week_total_seconds
							  ? formatTotalHours(row.waka_week_total_seconds)
							  : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const formatTotalHours = totalSeconds => {
  const hour = Math.floor(totalSeconds / 3600);
  const minute = Math.floor((totalSeconds % 3600) / 60);
  return `${hour > 0 ? hour + 'hrs' : ''} ${minute}mins`;
};

Table.propTypes = {
  data: PropTypes.array
};

export default Table;
