import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import { GiHamburgerMenu } from 'react-icons/gi';
import Button from '../Button';
import MobileBar from './MobileBar';
import { useUser } from '../../hooks/customContexts';
import Login from '../GithubLogin';
import Theme from '../Theme';
const Bar = () => {
	const [showSidebar, setShowSidebar] = useState(false);
	const { user } = useUser();

	const style =
		'border border-red-950 p-2 w-fit hover:bg-red-950 hover:text-white hover:border-white text-gray-400 dark:border-gray-400';
	const { VITE_WAKA_ID: CLIENT_ID } = import.meta.env;
	console.log(user);
	const handleClick = () => {
		setShowSidebar(prev => !prev);
	};
	const handleConnect = () => {
		const scope = 'email read_stats read_logged_time';
		const redirectUrl = 'http://localhost:5173/dashboard';
		const query = `response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}&scope=${scope}`;
		window.location.assign(`https://wakatime.com/oauth/authorize?${query}`);
	};
	return (
		<header className=''>
			<div className='fixed bg-gradient-to-bl from-dark to-red-950 text-gray-300 p-4 top-0 left-0 right-0 z-40 flex justify-between items-center md:hidden'>
				<h1 className=''>
					<Link to='/'>ProAlx</Link>
				</h1>
				<Button
					handleClick={handleClick}
					value={<GiHamburgerMenu />}
					style=''
				/>
			</div>

			<div className='hidden w-fit top-0 bottom-0 left-0 px-2 z-20 border-r h-full md:flex flex-col items-left bg-gradient-to-tl from-red-950 to-dark text-gray-300'>
				<h1 className='text-gray-500 text-2xl font-extrabold border-b py-4 text-center mb-3'>
					<Link to={'/'}>ProAlx</Link>
				</h1>
				<div className='flex flex-col justify-between w-full h-full items-left'>
					<DashboardNav />
					<Theme />

					<div className='flex flex-col gap-2 mb-2 w-fit'>
						{!user?.waka && (
							<Button
								value='connect wakatime'
								style={style}
								handleClick={handleConnect}
							/>
						)}
						<div className='flex gap-2 items-center'>
							<img
								src={user.photo_url}
								alt='profile photo'
								className='rounded-full w-10  border border-blur'
							/>
							<span>{user.name}</span>
						</div>
						<Login style='text-gray-300 dark:text-gray-400 hover:bg-red-950 hover:text-white px-2 self-start' />
					</div>
				</div>
			</div>

			{showSidebar && (
				<MobileBar handleClick={handleClick} showSidebar={showSidebar} />
			)}
		</header>
	);
};
export default Bar;
