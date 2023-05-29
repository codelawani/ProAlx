import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import PropTypes from 'prop-types';
import { useUser } from '../hooks/UseUserContext';
import localDataMgr from '../hooks/localDataMgr';
// env file in path ProAlx/pro-alx-UI
const {
  VITE_GITHUB_ID: CLIENT_ID
} = import.meta.env;
// REDIRECT_URI used 'http://localhost:5173/';
const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
const apiGithub = 'http://localhost:5000/api/v1/github/';
const SCOPE = 'read:user';

const LoginWithGithub = ({ style = 'text-white' }) => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, updateLoading } = useUser();
  const handleAuth = () => {
    const authUrl = GITHUB_AUTH_URL +
      `?client_id=${CLIENT_ID}` +
      '&response_type=code' +
      `&scope=${SCOPE}`;
    console.log(authUrl);
    window.location.assign(authUrl);
  };
  const handleLogout = () => {
    const token = localDataMgr.get('access_token');
    console.log(token);
    axios.get(`${apiGithub}logout`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        updateLoading(true);
        if (res.status === 200) {
          localDataMgr.clear();
          setIsLoggedIn(false);
          updateLoading(false);
          navigate('/');
        } else {
          console.log(res.data);
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <Button
      handleClick={isLoggedIn ? handleLogout : handleAuth}
      value={isLoggedIn ? 'logout' : 'Sign in with Github'}
      style={style}
    />

  );
};

export default LoginWithGithub;

LoginWithGithub.propTypes = {
  style: PropTypes.string
};
