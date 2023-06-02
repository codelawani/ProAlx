import { useUserData } from '../../hooks/fetchData';
import TempLoader from '../../components/TempLoader';
//import { useUser } from '../../hooks/UseUserContext';

const Dashboard = () => {
	const { value, isInitialLoading } = useUserData({
		queryKey: 'userdata',
		endpoint: '/user/daily_commits',
	});
	console.log(value);
	//const { user } = useUser();
	if (isInitialLoading) return <TempLoader />;
	return (
		<div className='w-full'>
			<h2>Dashboard</h2>
		</div>
	);
};

export default Dashboard;
