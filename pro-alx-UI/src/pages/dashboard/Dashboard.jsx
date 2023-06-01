import { useUserData } from "../../hooks/fetchData"
import UserChart from '../../components/details/Chart';
import TempLoader from '../../components/TempLoader';
//import SideBar from "../../components/dashboard/SideBar";

const Dashboard = () => {
	const { value } = useUserData({
	queryKey: 'userdata',
	endpoint: '/github/daily_commits/last_20_days',
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
	
	
	// if (isInitialLoading) return <TempLoader/>;

  return (
		<div className='w-full'>
			<h2>Dashboard</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi rem
				voluptatibus eligendi itaque sint, aspernatur doloremque nulla amet
				repellendus quia non labore illum neque dolore aut unde hic. Quo
				dignissimos non at quisquam nesciunt dolores nihil, fugiat veritatis
				facilis consequatur est, repellat hic voluptate. Assumenda modi porro
				rerum minus aliquam quisquam dolores totam voluptas aliquid culpa
				consequatur laudantium deserunt saepe, dolorum exercitationem sint eum
				quaerat quia explicabo amet quibusdam deleniti. Minima tempore assumenda
				culpa a vel nesciunt aperiam labore rerum impedit dolores qui quod
				iusto, illum veniam officiis, dolorum nihil perferendis sed illo odit
				perspiciatis quia voluptates. Mollitia, nostrum atque!
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi rem
				voluptatibus eligendi itaque sint, aspernatur doloremque nulla amet
				repellendus quia non labore illum neque dolore aut unde hic. Quo
				dignissimos non at quisquam nesciunt dolores nihil, fugiat veritatis
				facilis consequatur est, repellat hic voluptate. Assumenda modi porro
				rerum minus aliquam quisquam dolores totam voluptas aliquid culpa
				consequatur laudantium deserunt saepe, dolorum exercitationem sint eum
				quaerat quia explicabo amet quibusdam deleniti. Minima tempore assumenda
				culpa a vel nesciunt aperiam labore rerum impedit dolores qui quod
				iusto, illum veniam officiis, dolorum nihil perferendis sed illo odit
				perspiciatis quia voluptates. Mollitia, nostrum atque!
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi rem
				voluptatibus eligendi itaque sint, aspernatur doloremque nulla amet
				repellendus quia non labore illum neque dolore aut unde hic. Quo
				dignissimos non at quisquam nesciunt dolores nihil, fugiat veritatis
				facilis consequatur est, repellat hic voluptate. Assumenda modi porro
				rerum minus aliquam quisquam dolores totam voluptas aliquid culpa
				consequatur laudantium deserunt saepe, dolorum exercitationem sint eum
				quaerat quia explicabo amet quibusdam deleniti. Minima tempore assumenda
				culpa a vel nesciunt aperiam labore rerum impedit dolores qui quod
				iusto, illum veniam officiis, dolorum nihil perferendis sed illo odit
				perspiciatis quia voluptates. Mollitia, nostrum atque!
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi rem
				voluptatibus eligendi itaque sint, aspernatur doloremque nulla amet
				repellendus quia non labore illum neque dolore aut unde hic. Quo
				dignissimos non at quisquam nesciunt dolores nihil, fugiat veritatis
				facilis consequatur est, repellat hic voluptate. Assumenda modi porro
				rerum minus aliquam quisquam dolores totam voluptas aliquid culpa
				consequatur laudantium deserunt saepe, dolorum exercitationem sint eum
				quaerat quia explicabo amet quibusdam deleniti. Minima tempore assumenda
				culpa a vel nesciunt aperiam labore rerum impedit dolores qui quod
				iusto, illum veniam officiis, dolorum nihil perferendis sed illo odit
				perspiciatis quia voluptates. Mollitia, nostrum atque!
			</p>
		</div>
	);
};

export default Dashboard;
