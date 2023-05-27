import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import PropTypes from 'prop-types';
// env file in path ProAlx/pro-alx-UI
const {
  VITE_GITHUB_ID: CLIENT_ID
} = import.meta.env;
const REDIRECT_URI = 'http://localhost:5173/';
const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
const apiGithub = 'http://localhost:5000/api/v1/github/';
const SCOPE = 'read:user';

const LoginWithGithub = ({ isLoggedIn, setIsLoggedIn, setIsLoading }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      handleLogin(code);
    }
  }, []);
  const handleAuth = () => {
    const authUrl = GITHUB_AUTH_URL +
      `?client_id=${CLIENT_ID}` +
      '&response_type=code' +
      `&scope=${SCOPE}`;
    console.log(authUrl);
    window.location.assign(authUrl);
  };
  const handleLogin = code => {
    setIsLoading(true);
    console.log(code);
    code = encodeURIComponent(code);
    const loginEndpoint = `${apiGithub}login?code=${code}`;
    console.log(loginEndpoint);
    axios.get(loginEndpoint, { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          setIsLoggedIn(true);
          setIsLoading(false);
          navigate('/');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleLogout = () => {
    console.log('c', document.cookie);
    axios.post(`${apiGithub}logout`, null, { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          setIsLoggedIn(false);
          navigate('/');
        } else {
          console.log(res.data);
        }
      })
      .catch(err => console.log(err));
  };
  return (
    isLoggedIn
      ? (
        <Button handleClick={handleLogout} value='Logout' />
        )
      : (
        <Button handleClick={handleAuth} value='Login with github' />
        )
  );
};

export default LoginWithGithub;

LoginWithGithub.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired
};
