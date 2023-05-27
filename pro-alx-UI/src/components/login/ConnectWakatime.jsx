import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import PropTypes from 'prop-types';
import localDataMgr from '../../localDataMgr';

const CLIENT_ID = 'KTSTb93yy7Ua2ykNW1gSClkr';
const apiWakatime = 'http://localhost:5000/api/v1/wakatime';
const ConnectWakatime = ({ setWakaUser, setIsLoading }) => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(!!localDataMgr.get('wakaUser'));
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      handleConnect(code);
    }
  }, []);
  // console.log(!!localDataMgr.get('wakaUser'));
  // console.log(isConnected);
  const handleAuth = () => {
    const scope = 'email read_stats read_logged_time';
    const redirectUrl = 'http://localhost:5173/';
    const query = `response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}&scope=${scope}`;
    window.location.assign(`https://wakatime.com/oauth/authorize?${query}`);
  };

  const handleConnect = code => {
    setIsLoading(true);
    let loginToken = localDataMgr.get('user');
    if (loginToken) {
      loginToken = JSON.parse(loginToken);
      const headers = {
        Authorization: `Bearer${loginToken}`
      };
      axios
        .get(`${apiWakatime}/login?code=${code}`, { headers })
        .then(res => {
          if (res.status === 200) {
            const sessionToken = res.data?.wakatimeSession;
            localDataMgr.set('wakaUser', JSON.stringify(sessionToken));
            setIsLoading(false);
            navigate('/');
          }
        })
        .catch(err => console.log(err));
    } else {
      console.log('User not logged in');
    }
  };

  const handleDisconnect = () => {
    const storedUser = localDataMgr.get('user');
    if (storedUser?.wakaUser) {
      const sessionToken = JSON.parse(storedUser.wakaUser);
      console.log('Ws', sessionToken);
      axios.post(`${apiWakatime}logout`, null, {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            localDataMgr.remove('wakaUser');
            setWakaUser(null);
            navigate('/');
          } else {
            console.log(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  return (
    <>
      {isConnected
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
  setWakaUser: PropTypes.func,
  setIsLoading: PropTypes.func
};
