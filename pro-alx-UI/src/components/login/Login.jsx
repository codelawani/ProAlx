import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import PropTypes from 'prop-types';

const CLIENT_ID = 'KTSTb93yy7Ua2ykNW1gSClkr';
const URL = 'http://127.0.0.1:5000/api/v1';

const Login = ({ setUser, setIsLoading }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        setUser(userData);
      } else {
        handleLogin(code);
      }
    }
  }, []);

  const handleRedirect = () => {
    const values = {
      scope: 'email read_stats read_logged_time',
      redirectUrl: 'http://localhost:5174/'
    };
    const query = `response_type=code&client_id=${CLIENT_ID}&redirect_uri=${values.redirectUrl}&scope=${values.scope}`;
    window.location.assign(
			`https://wakatime.com/oauth/authorize?${query}`
    );
  };

  const handleLogin = async code => {
    setIsLoading(true);
    await axios
      .get(`${URL}/user/login?code=${code}`)
      .then(res => {
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        setIsLoggedIn(true);
        console.log(res.data);
        navigate('/');
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  };

  const handleLogout = () => {
    setUser({});
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
  <>
  {isLoggedIn
? (
  <Button handleClick={handleLogout} value="Logout" />
			)
: (
  <Button handleClick={handleRedirect} value="Login" />
			)}
		</>
  );
};

export default Login;

Login.propTypes = {
  setUser: PropTypes.func,
  setIsLoading: PropTypes.func
};
