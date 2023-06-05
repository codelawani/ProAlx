import { useUserData } from '../../hooks/fetchData';
import TempLoader from '../../components/TempLoader';

const Dashboard = () => {
	const { value, isInitialLoading } = useUserData({
		queryKey: 'userdata',
		endpoint: '/users/leaderboard',
	});
	console.log(value);
	if (isInitialLoading) return <TempLoader />;
	return (
		<div className='w-full'>
			<h2>Dashboard</h2>
		</div>
	);
};

export default Dashboard;
