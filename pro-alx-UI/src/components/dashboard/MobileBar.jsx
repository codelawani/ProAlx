import Button from '../Button';
import DashboardNav from './DashboardNav';
import { TfiClose } from 'react-icons/tfi';
import PropTypes from 'prop-types';
import { useUser } from '../../hooks/customContexts';
import Theme from '../Theme';
import LoginWithGithub from '../GithubLogin';

const MobileBar = ({ handleClick }) => {
	const { user } = useUser();
	const style = 'text-white border px-3 py-1';
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
			<div className='fixed bg-dark-hero text-white right-4 p-4 z-50 flex flex-col justify-center items-start rounded gap-2 duration-300 ease-linear transition transform top-10 animate-nav origin-top'>
				<Button
					value={<TfiClose />}
					style='self-end pb-3'
					handleClick={handleClick}
				/>
				<DashboardNav handleClick={handleClick} />
				{!user?.waka && (
					<Button value='wakatime' style={style} handleClick={handleConnect} />
				)}
				<div className='flex gap-2 items-center border border-blur rounded-lg mb-2 w-fit px-2'>
					<img
						src={user.photo_url}
						alt='profile photo'
						className='rounded-full w-10'
					/>
					<span>{user.name}</span>
				</div>
				<LoginWithGithub />
				<Theme />
			</div>
		</>
	);
};

MobileBar.propTypes = {
	handleClick: PropTypes.func,
};

export default MobileBar;
