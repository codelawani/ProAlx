import { useUserData } from '../../hooks/fetchData';
import TempLoader from '../../components/TempLoader';
import Table from '../../components/Table';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  const { value, isInitialLoading } = useUserData({
    queryKey: 'userdata',
    endpoint: '/cohorts/9/needs_partners'
  });
  console.log(value);
  if (isInitialLoading) return <TempLoader />;
  return (
    <div className='w-full font-light'>
      <h2 className='font-bold text-xl'>Find a Partner</h2>
      <Table data={value} />
      <p className='font-thin text-sm text-gray-600'>Statistics displayed for <span className='text-sky-500'>last 7 days</span></p>
      <br />
      <p>See <Link to='/leaderboard' className='text-blue-400 hover:text-blue-500 hover:underline'>Leaderboard</Link></p>
    </div>
  );
};

export default Dashboard;
