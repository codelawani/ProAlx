import Button from '../Button';
import DashboardNav from './DashboardNav';
import { TfiClose } from 'react-icons/tfi';
import PropTypes from 'prop-types';
import { useUser } from '../../hooks/customContexts';
import Theme from '../Theme';
import LoginWithGithub from '../GithubLogin';
import { Link } from 'react-router-dom';

const MobileBar = ({ handleClick }) => {
	const { user } = useUser();
	const style = 'text-body font-mono uppercase border px-3 py-1';
	const { VITE_WAKA_ID: CLIENT_ID } = import.meta.env;

	const handleConnect = () => {
		const scope = 'email read_stats read_logged_time';
		const redirectUrl = 'http://localhost:5173/dashboard';
		const query = `response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}&scope=${scope}`;
		window.location.assign(`https://wakatime.com/oauth/authorize?${query}`);
	};
	return (
		<>
			<div
				className='bg-body fixed top-0 bottom-0 left-0 right-0 z-10 opacity-20'
				onClick={handleClick}
			/>
			<div className='fixed dark:bg-[#010414] text-white right-2 p-4 z-50 flex flex-col justify-center rounded gap-2 duration-300 ease-linear transition transform top-14 animate-nav origin-top bg-dark-blue w-fit items-center'>
				<div className='flex items-center justify-between w-full pb-2 '>
					<Theme />
					<Button value={<TfiClose />} style='' handleClick={handleClick} />
				</div>
				<DashboardNav handleClick={handleClick} />
				{!user?.waka && (
					<Button
						value='connect wakatime'
						style={style}
						handleClick={handleConnect}
					/>
				)}
				<Link
					to='contact'
					className=' font-mono uppercase'
					onClick={handleClick}
				>
					contact us
				</Link>

				<LoginWithGithub style='font-mono uppercase' />

				<div className='flex gap-2 items-center border border-blur rounded-lg mb-2 w-fit px-2'>
					<img
						src={user.photo_url}
						alt='profile photo'
						className='rounded-full w-10'
					/>
					<span>{user.name}</span>
				</div>
			</div>
		</>
	);
};

MobileBar.propTypes = {
	handleClick: PropTypes.func,
};

export default MobileBar;
