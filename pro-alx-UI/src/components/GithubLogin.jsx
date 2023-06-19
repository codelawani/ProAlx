import Button from './Button';
import PropTypes from 'prop-types';
import { useUser } from '../hooks/customContexts';
import { BiLogOut } from 'react-icons/bi';
import { handleAuth, handleLogout } from '../utils/githubOauth';
const LoginWithGithub = ({ style = 'text-white', handleClick = () => {} }) => {
	const { isLoggedIn, setIsLoggedIn, updateLoading, setUser } = useUser();

	// control what happens when login/logout button is clicked depending on if user is logged in
	const handleButtonEvent = () => {
		if (isLoggedIn) {
			handleLogout(setIsLoggedIn, setUser, updateLoading);
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
