import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const {
  VITE_GITHUB_ID: CLIENT_ID
} = import.meta.env;
const REDIRECT_URI = 'http://localhost:5173/';
const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
const SCOPE = 'read:user';
console.log(CLIENT_ID);

const LoginWithGithub = ({ setUser, setIsLoading }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!window.localStorage.getItem('user'));
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (isLoggedIn) {
      setUser(window.localStorage.getItem('user'));
    }
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
    const loginEndpoint = `http://localhost:5000/github/login?code=${code}`;
    console.log(loginEndpoint);
    axios.get(loginEndpoint)
      .then(res => {
        const sessionToken = res.data.session;
        setUser(sessionToken);
        window.localStorage.setItem('user', JSON.stringify(sessionToken));
        setIsLoggedIn(true);
        setIsLoading(false);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleLogout = () => {
    let sessionToken = window.localStorage.getItem('user');
    if (sessionToken) {
      sessionToken = JSON.parse(sessionToken);
      console.log(sessionToken);
      axios.post('https://localhost:5000/github/logout', null, {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      })
        .then(() => {
          setUser('');
          setIsLoggedIn(false);
          navigate('/');
        })
        .catch(err => {
          console.log(err);
        });
    }
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
