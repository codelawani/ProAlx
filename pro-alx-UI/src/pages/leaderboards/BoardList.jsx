import Board from './Board';
import { useUserData } from '../../hooks/fetchData';
import { useNavigate } from 'react-router-dom';
//import { useState } from 'react';
//import Button from '../../components/Button';
import { leaderboardList } from '../../data';
import withPagination from '../../components/Paginate';
// import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const BoardList = ({ data }) => {
	const navigate = useNavigate();

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
// const useData = () => {
// 	const { value } = useUserData({
// 		queryKey: `leaderboard`,
// 		endpoint: `/users/leaderboard`,
// 		keepPreviousData: true,
// 	});
// 	return value;
// };
const EnhancedBoardList = withPagination(BoardList, leaderboardList, 10);

BoardList.propTypes = {
	data: PropTypes.array,
};

export default EnhancedBoardList;
