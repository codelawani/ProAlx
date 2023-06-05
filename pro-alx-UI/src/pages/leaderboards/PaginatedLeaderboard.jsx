//import { leaderboardList } from '../../data';
import withPagination from '../../components/Paginate';
import BoardList from './BoardList';
//import { useUserData } from '../../hooks/fetchData';

const PaginatedBoardList = withPagination(
	BoardList,
	'leaderboard',
	'/users/leaderboard',
	10
);

const Leaderboards = () => {
	return <PaginatedBoardList />;
};

export default Leaderboards;
