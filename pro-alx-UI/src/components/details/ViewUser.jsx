import { useUserData } from '../../hooks/fetchData';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../Button';
import UserChart from './UserChart';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

const dataset = {
	'2023-05-14': {
		'alx-higher_level': 9238.773577,
		'alx-system_devops': 299.72227,
		printf: 7119.960505,
	},
	'2023-05-15': {
		AirBnB_clone_v2: 2220.406212,
		AirBnB_clone_v3: 10175.88833,
	},

	'2023-05-16': {
		'alx-system_engineering': 18196.040971,
		'alx-low_level': 2903.1054,
		AirBnB_clone: 11766.9124,
	},
	'2023-05-17': {
		'alx-higher_level': 9238.773577,
		'alx-system_devops': 299.72227,
		printf: 7119.960505,
	},
	'2023-05-18': {
		AirBnB_clone_v2: 2220.406212,
		AirBnB_clone_v3: 10175.88833,
	},

	'2023-05-19': {
		'alx-system_engineering': 18196.040971,
		'alx-low_level': 2903.1054,
		AirBnB_clone: 11766.9124,
	},
	'2023-05-20': {
		'alx-system_engineering': 18196.040971,
		'alx-low_level': 2903.1054,
		AirBnB_clone: 11766.9124,
	},
};

const ViewUser = () => {
	// id : the user id gotten from the route link
	// const { id } = useParams();

	// user Details endpoint will be something like this 'user/uid/details'
	// please include a property to indicate if the user has connected wakatime
	const { value: userDetails } = useUserData({
		queryKey: 'userda',
		endpoint: '/user/daily_commits',
	});

	// user stats endpoint will be something like this 'user/uid/stats'

	const { value: userStats } = useUserData({
		queryKey: 'userdata',
		endpoint: '/user/daily_commits',
		enabled: userDetails,
	});
	const navigate = useNavigate();
	return (
		<div className='w-full'>
			<div className='flex items-center justify-between mb-11'>
				<h3 className='text-lg'>user name</h3>
				<Button
					value={<MdOutlineArrowBackIosNew />}
					handleClick={() => navigate(-1)}
					style='border border-red-950 p-2 hover:bg-red-950'
				/>
			</div>
			<div className='flex flex-col md:flex-row md:justify-between'>
				<div id='user-details' className='flex flex-col justify-center'>
					<p className='border rounded h-32 w-fit p-3'>user image</p>
					<p>name</p>
					<p>total hours</p>
					<p>location</p>
					<p>social links</p>
				</div>
				<div className='w-fit'>
					<UserChart value={userStats ? dataset : {}} isGithubData={false} />
				</div>
			</div>
		</div>
	);
};

export default ViewUser;
