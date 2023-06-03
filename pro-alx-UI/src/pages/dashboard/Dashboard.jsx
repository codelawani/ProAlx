import { useUserData } from '../../hooks/fetchData';
import TempLoader from '../../components/TempLoader';
// import { useUser } from '../../hooks/UseUserContext';

const Dashboard = () => {
  const { value, isInitialLoading } = useUserData({
    queryKey: 'userdata',
    endpoint: '/user/daily_commits'
  });
  const { setWakaconnected } = useUser();
  const { updateLoading } = useUser();
  const API = 'http://127.0.0.1:5000/api/v1';

  console.log(value);
  // const { user } = useUser();
  if (isInitialLoading) return <TempLoader />;
  return (
    <div className='w-full'>
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
