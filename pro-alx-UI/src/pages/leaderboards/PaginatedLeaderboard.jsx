import { useState } from 'react';
import withPagination from '../../components/Paginate';
import BoardList from './BoardList';
import { useUserData } from '../../hooks/fetchData';
import { IoMdFunnel } from 'react-icons/io';

const PaginatedBoardList = withPagination(BoardList, 15);

const Leaderboards = () => {
  const [filterKey, setFilterKey] = useState('');
  const { value, refetch } = useUserData({
    queryKey: ['leaderboard', filterKey],
    endpoint: `${
			filterKey ? `cohorts/${filterKey}/leaderboard` : '/users/leaderboard'
		}`
  });

  const rankedList = value?.map((item, index) => ({
    ...item,
    rank: index + 1
  }));
  const handleSubmit = e => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className='pt-7 px-2 relative'>
      <h3 className='pb-4 font-semibold text-lg uppercase'>Leaderboard</h3>
      <form className='flex justify-end pb-5' onSubmit={handleSubmit}>
        <div className='relative w-[70%] md:w-[30%]'>
          <input
            type='number'
            name='filter_key'
            className='py-2 px-3 w-full rounded-md outline-none dark:bg-blur dark:text-white'
            value={filterKey}
            onChange={e => {
						  setFilterKey(e.target.value);
            }}
            placeholder='filter by cohort number'
            min={8}
            max={25}
          />
          <IoMdFunnel className='absolute top-[50%] right-2 transform -translate-y-[50%]' />
        </div>
      </form>
      <PaginatedBoardList data={rankedList} />
    </div>
  );
};

export default Leaderboards;
