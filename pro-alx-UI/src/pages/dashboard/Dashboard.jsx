import { useUserData } from '../../hooks/fetchData';
import UserChart from '../../components/details/Chart';
import TempLoader from '../../components/TempLoader';
//import SideBar from "../../components/dashboard/SideBar";

const Dashboard = () => {
  const { value, isInitialLoading } = useUserData({
    queryKey: 'userdata',
    endpoint: '/user/daily_commits'
  });
  console.log(value);
  // const dataset = {
  //   '2023-05-14': {
  //     'alx-higher_level': 9238.773577,
  //     'alx-system_devops': 299.72227,
  //     printf: 7119.960505
  //   },
  //   '2023-05-15': {
  //     AirBnB_clone_v2: 2220.406212,
  //     AirBnB_clone_v3: 10175.88833
  //   },

  //   '2023-05-16': {
  //     'alx-system_engineering': 18196.040971,
  //     'alx-low_level': 2903.1054,
  //     AirBnB_clone: 11766.9124
  //   },
  //   '2023-05-17': {
  //     'alx-higher_level': 9238.773577,
  //     'alx-system_devops': 299.72227,
  //     printf: 7119.960505
  //   },
  //   '2023-05-18': {
  //     AirBnB_clone_v2: 2220.406212,
  //     AirBnB_clone_v3: 10175.88833
  //   },

  //   '2023-05-19': {
  //     'alx-system_engineering': 18196.040971,
  //     'alx-low_level': 2903.1054,
  //     AirBnB_clone: 11766.9124
  //   },
  //   '2023-05-20': {
  //     'alx-system_engineering': 18196.040971,
  //     'alx-low_level': 2903.1054,
  //     AirBnB_clone: 11766.9124
  //   }
  // };

  if (isInitialLoading) return <TempLoader />;

  return (
    <div className='w-full'>
      <h2>Dashboard</h2>
      <UserChart value={value} isGithubData />
    </div>
  );
};

export default Dashboard;
