import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import Button from '../../components/Button';

// import { toast } from 'react-toastify';
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

  const BoardItems = data.map((item, index) => {
    return (
      <tr
        className='grid grid-cols-7 content-center border-b dark:border-blur last:border-none py-3 md:gap-9 '
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
          {getTime(item.waka_week_total_seconds)}
        </td>
        <td className='text-center col-span-2'>
          {getTime(item.waka_week_daily_average)}
        </td>
      </tr>
    );
  });

  return (
    <div className=''>
      <h3 className='pb-4 font-semibold text-lg'>Leaderboards</h3>
      <table className='table-auto flex flex-col'>
        <thead className=''>
          <tr className='grid grid-cols-7 content-center'>
            <th className='col-span-1'>Rank</th>
            <th className='col-span-2'>Fullname</th>
            <th className='col-span-2'>Hours</th>
            <th className='col-span-2'>Average</th>
          </tr>
        </thead>

        <tbody>{BoardItems}</tbody>
      </table>
    </div>
  );
};
BoardList.propTypes = {
  data: PropTypes.array
};

export default BoardList;
