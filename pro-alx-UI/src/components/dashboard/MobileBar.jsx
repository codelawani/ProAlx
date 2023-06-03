import Button from '../Button';
import DashboardNav from './DashboardNav';
import { TfiClose } from 'react-icons/tfi';
import PropTypes from 'prop-types';
import { useUser } from '../../hooks/customContexts';
import Theme from '../Theme';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import localDataMgr, { getUser } from '../../hooks/localDataMgr';
import api from '../../hooks/api';
const API = 'http://localhost:5000/api/v1';
const MobileBar = ({ handleClick }) => {
  const { user, setUser, updateLoading } = useUser();
  const style = 'text-white border px-3 py-1';
  const { VITE_WAKA_ID: CLIENT_ID } = import.meta.env;
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(user);
    const handleConnect = (code) => {
      updateLoading(true);
      api
        .get(`${API}/waka/authorize?code=${code}`)
        .then((res) => {
          if (res.status === 200) {
            const data = res.data;
            console.log(data);
            localDataMgr.set('access_token', data.access_token);
            setUser(getUser());
            const newUrl = window.location.pathname;
            window.history.replaceState(null, '', newUrl);
            if (user.waka) {
              updateLoading(false);
            }
          }
        })
        .catch((err) => {
          toast.error('Something went wrong');
          toast.error(err.message);
          updateLoading(false);
        });
    };
    if (code) {
      handleConnect(code);
    }
  }, []);
  const handleConnect = () => {
    const scope = 'email read_stats read_logged_time';
    const redirectUrl = 'http://localhost:5173/dashboard';
    const query = `response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}&scope=${scope}`;
    window.location.assign(`https://wakatime.com/oauth/authorize?${query}`);
  };
  return (
    <>
      <div
        className='bg-black fixed top-0 bottom-0 left-0 right-0 z-10 opacity-50'
        onClick={handleClick}
      />
      <div className='fixed bg-dark text-white top-16  right-4 md:hidden p-4 z-50 flex flex-col justify-center items-start rounded gap-2'>
        <Button
          value={<TfiClose />}
          style='self-end pb-3'
          handleClick={handleClick}
        />
        <DashboardNav handleClick={handleClick} />
        {!user.waka &&
          <Button
            value='wakatime' style={style}
            handleClick={handleConnect}
          />}
        <div className='flex gap-2 items-center border border-blur rounded-lg mb-2 w-fit px-2'>
          <img
            src={user.photo_url}
            alt='profile photo'
            className='rounded-full w-10'
          />
          <span>{user.name}</span>
        </div>
        <Theme />
      </div>
    </>
  );
};

MobileBar.propTypes = {
  handleClick: PropTypes.func
};

export default MobileBar;
