import { useNavigate } from 'react-router-dom';
import Button from './Button';
import PropTypes from 'prop-types';
import { useUser } from '../hooks/customContexts';
import localDataMgr from '../hooks/localDataMgr';
import { BiLogOut } from 'react-icons/bi';
// env file in path ProAlx/pro-alx-UI
const { VITE_GITHUB_ID: CLIENT_ID } = import.meta.env;
// REDIRECT_URI used 'http://localhost:5173/';
const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
const SCOPE = 'read:user';

const LoginWithGithub = ({ style = 'text-white', handleClick = () => {} }) => {
	const navigate = useNavigate();
	const { isLoggedIn, setIsLoggedIn, updateLoading, setUser } = useUser();
	const handleAuth = () => {
		const authUrl =
			GITHUB_AUTH_URL +
			`?client_id=${CLIENT_ID}` +
			'&response_type=code' +
			`&scope=${SCOPE}`;
		window.location.assign(authUrl);
	};
	const clearUser = () => {
		localDataMgr.clear();
		setIsLoggedIn(false);
		updateLoading(false);
		setUser('');
		navigate('/');
	};
	const handleLogout = () => {
		updateLoading(true);
		clearUser();
	};

	const handleButtonEvent = () => {
		if (isLoggedIn) {
			handleLogout();
		} else {
			handleAuth();
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
