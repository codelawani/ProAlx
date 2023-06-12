import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const BoardList = ({ data }) => {
	const navigate = useNavigate();

	// view a user's profile
	const handleClick = id => {
		navigate(`/user/${id}`);
	};

	// convert time in seconds to hours and minutes
	const getTime = seconds => {
		const hour = Math.floor(seconds / 3600);
		const minute = Math.floor((seconds % 3600) / 60);
		return `${hour > 0 ? hour + 'hrs' : ''} ${minute}mins`;
	};

	const BoardItems = data?.map(item => {
		return (
			<tr
				className='flex items-center md:grid grid-cols-7 content-center dark:even:bg-bar-light rounded dark:border-blur last:border-none py-[1.5rem] md:gap-9 border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-900 hover:rounded-lg text-xs md:text-sm even:bg-bar even:text-white hover:even:bg-gray-800 transition-all duration-300 ease-in-out'
				key={item.id}
			>
				<td className='basis-1/6 text-center col-span-1'>{item.rank}</td>
				<td
					className='basis-3/4 text-center text-blue-500 dark:text-blue-700 cursor-pointer col-span-2 flex items-center gap-1 md:gap-2'
					onClick={() => handleClick(item.id)}
				>
					<img
						src={item.photo_url}
						alt='profile picture'
						className='w-6 h-6 rounded-full'
					/>
					<span className='truncate hover:underline'>{item.name}</span>
				</td>
				<td className='text-center col-span-2 hidden md:inline'>
					{item.waka_week_total_seconds
						? getTime(item.waka_week_total_seconds)
						: '-'}
				</td>
				<td className='text-center col-span-2 basis-2/6'>
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
				<tr className='flex md:grid md:grid-cols-7 content-center font-mono uppercase text-xs md:text-sm'>
					<th className='basis-1/6 md:col-span-1'>Rank</th>
					<th className='basis-3/4 text-left pl-5 md:col-span-2'>Name</th>
					<th className=' md:col-span-2 hidden md:inline'>total hours</th>
					<th className='col-span-2 basis-3/6'>daily average</th>
				</tr>
			</thead>

			<tbody className='bg-white dark:bg-black rounded mt-3'>
				{BoardItems}
			</tbody>
		</table>
	);
};
BoardList.propTypes = {
	data: PropTypes.array,
};

export default BoardList;
