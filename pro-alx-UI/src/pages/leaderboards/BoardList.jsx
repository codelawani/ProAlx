import Board from './Board';
import { useUserData } from '../../hooks/fetchData';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/Button';
// import { toast } from 'react-toastify';

const data = [
  {
    rank: 1,
    name: 'John doe',
    hours: 4090.09,
    average: 450.9
  },
  {
    rank: 2,
    name: 'Jane doe',
    hours: 5090.09,
    average: 350.9
  },
  {
    rank: 3,
    name: 'John smith',
    hours: 2090.094,
    average: 1450.9
  },
  {
    rank: 4,
    name: 'Jane smith',
    hours: 44090.09,
    average: 2450.9
  }
];

const BoardList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { value } = useUserData({
    queryKey: `leaderboard${pageNumber}`,
    endpoint: `/users/${pageNumber}`,
    keepPreviousData: true
  });

  console.log(value);
  const navigate = useNavigate();

  const handleClick = id => {
    navigate(`/user/${id}`);
  };

  const prevPage = () => {
    // check if current pageNumber is less than 1
    if (pageNumber <= 1) return;
    setPageNumber(prev => prev - 1);
  };

  const nextPage = () => {
    // check if current pageNumber is equal to total number of pages first

    setPageNumber(prev => prev + 1);
  };
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

        <tbody>
          {data.map(item => (
            <Board key={item.rank} handleClick={handleClick} {...item} />
          ))}
        </tbody>
      </table>
      <div className='flex justify-between text-blue-500 dark:text-blue-300 w-full'>
        {pageNumber > 1 && <Button value='PrevPage' handleClick={prevPage} />}
        <Button value='NextPage' handleClick={nextPage} style='' />
      </div>
    </div>
  );
};

export default BoardList;
