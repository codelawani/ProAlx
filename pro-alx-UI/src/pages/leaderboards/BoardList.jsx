import Board from './Board';
import { useUserData } from '../../hooks/fetchData';
import { useNavigate } from 'react-router-dom';

const data = [
	{
		rank: 1,
		name: 'John doe',
		hours: 4090.09,
		average: 450.9,
	},
	{
		rank: 2,
		name: 'Jane doe',
		hours: 5090.09,
		average: 350.9,
	},
	{
		rank: 3,
		name: 'John smith',
		hours: 2090.094,
		average: 1450.9,
	},
	{
		rank: 4,
		name: 'Jane smith',
		hours: 44090.09,
		average: 2450.9,
	},
];

const BoardList = () => {
	const { value } = useUserData({
		queryKey: 'leaderboards',
		endpoint: '/user/daily_commits',
		keepPreviousData: true,
	});
	const navigate = useNavigate();
	console.log(value);

	const handleClick = id => {
		navigate(`/user/${id}`);
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
		</div>
	);
};

export default BoardList;
