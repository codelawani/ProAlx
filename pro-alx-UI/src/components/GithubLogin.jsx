import { useNavigate } from 'react-router-dom';
import Button from './Button';
import PropTypes from 'prop-types';
import { useUser } from '../hooks/customContexts';
import localDataMgr from '../utils/localDataMgr';
import { BiLogOut } from 'react-icons/bi';
import { handleAuth } from '../utils/githubOauth';
const LoginWithGithub = ({ style = 'text-white', handleClick = () => {} }) => {
	const navigate = useNavigate();
	const { isLoggedIn, setIsLoggedIn, updateLoading, setUser } = useUser();
	// clean up user state and local storage
	const clearUser = () => {
		localDataMgr.clear();
		setIsLoggedIn(false);
		setUser('');
		navigate('/');
		updateLoading(false);
	};
	const handleLogout = () => {
		updateLoading(true);
		clearUser();
	};

	// control what happens when login/logout button is clicked depending on if user is logged in
	const handleButtonEvent = () => {
		if (isLoggedIn) {
			handleLogout();
		} else {
			handleAuth(updateLoading);
		}
		handleClick();
	};

	return (
		<Button
			handleClick={handleButtonEvent}
			value={
				isLoggedIn ? (
					<span className='flex items-center gap-2 uppercase font-mono text-sm'>
						<BiLogOut className='text-[1.5rem]' />
						Signout
					</span>
				) : (
					'Sign in with Github'
				)
			}
			style={style}
		/>
	);
};

export default LoginWithGithub;

LoginWithGithub.propTypes = {
	style: PropTypes.string,
	handleClick: PropTypes.func,
};
