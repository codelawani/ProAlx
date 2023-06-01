import { useNavigate } from 'react-router-dom';
import Button from './Button';
import PropTypes from 'prop-types';
import { useUser } from '../hooks/UseUserContext';

const CLIENT_ID = 'KTSTb93yy7Ua2ykNW1gSClkr';
// const URL = 'http://127.0.0.1:5000/api/v1';

const Login = ({ setIsOpen, style = 'text-white' }) => {
  const navigate = useNavigate();
  // const { setUser, user, updateLoading } = useUser();
  const { isLoggedIn, setUser, setIsLoggedIn } = useUser();
  const handleRedirect = () => {
    const values = {
      scope: 'email read_stats read_logged_time',
      redirectUrl: 'http://localhost:5174/'
    };
    const query = `response_type=code&client_id=${CLIENT_ID}&redirect_uri=${values.redirectUrl}&scope=${values.scope}`;
    window.location.assign(`https://wakatime.com/oauth/authorize?${query}`);
  };

  const handleLogout = () => {
    setUser({});
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    navigate('/');
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <Button
      handleClick={isLoggedIn ? handleLogout : handleRedirect}
      value={isLoggedIn ? 'logout' : 'Sign in'}
      style={style}
    />
  );
};

Login.propTypes = {
  setIsOpen: PropTypes.func,
  style: PropTypes.string
};

export default Login;
