import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import PropTypes from 'prop-types';

const CLIENT_ID = import.meta.env.VITE_WAKA_ID;
const apiWakatime = 'http://localhost:5000/api/v1/wakatime';
const ConnectWakatime = ({ isWakaConnected, setIsWakaConnected, setIsConnecting }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      handleConnect(code);
    }
  }, []);
  const handleAuth = () => {
    const scope = 'email read_stats read_logged_time';
    const redirectUrl = 'http://localhost:5173/dashboard';
    const query = `response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}&scope=${scope}`;
    window.location.assign(`https://wakatime.com/oauth/authorize?${query}`);
  };

  const handleConnect = code => {
    setIsConnecting(true);
    console.log('connecting wakatime');
    axios
      .get(`${apiWakatime}/connect?code=${code}`, { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          setIsWakaConnected(true);
          navigate('/');
          setIsConnecting(false);
        } else {
          console.log(res.data);
        }
      })
      .catch(err => console.log(err));
  };
  const handleDisconnect = () => {
    axios.post(`${apiWakatime}/disconnect`, null, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setIsWakaConnected(false);
          navigate('/');
        } else {
          console.log(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      {isWakaConnected
        ? (
          <Button handleClick={handleDisconnect} value='Disconnect wakatime' />
          )
        : (
          <Button handleClick={handleAuth} value='Connect Wakatime' />
          )}
    </>
  );
};

export default ConnectWakatime;

ConnectWakatime.propTypes = {
  isWakaConnected: PropTypes.bool,
  setIsWakaConnected: PropTypes.func,
  setIsConnecting: PropTypes.func
};
