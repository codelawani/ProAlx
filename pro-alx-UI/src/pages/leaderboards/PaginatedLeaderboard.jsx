// import { leaderboardList } from '../../data';
import withPagination from '../../components/Paginate';
import BoardList from './BoardList';
import { useUserData } from '../../hooks/fetchData';

const PaginatedBoardList = withPagination(BoardList, 15);

const Leaderboards = () => {
	const { value } = useUserData({
		queryKey: ['leaderboard'],
		endpoint: '/users/leaderboard',
	});

	const rankedList = value?.map((item, index) => ({
		...item,
		rank: index + 1,
	}));
	return (
		<div className='pt-7 px-2'>
			<h3 className='pb-4 font-semibold text-lg uppercase'>Leaderboards</h3>
			<PaginatedBoardList data={rankedList} />
		</div>
	);
};

export default Leaderboards;
