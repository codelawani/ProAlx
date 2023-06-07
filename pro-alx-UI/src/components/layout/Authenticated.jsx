import { useUser, useTheme } from '../../hooks/customContexts';
import { Navigate, Outlet } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../dashboard/Bar';
import { useEffect } from 'react';
import api from '../../hooks/api';
import localDataMgr, { getUser } from '../../hooks/localDataMgr';
const Authenticated = () => {
  const API = 'http://127.0.0.1:5000/api/v1';
  const { theme } = useTheme();
  const { user, setUser, updateLoading, isLoggedIn } = useUser();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const handleConnect = code => {
      updateLoading(true);
      api
        .get(`${API}/waka/authorize?code=${code}`)
        .then(res => {
          if (res.status === 200) {
            const data = res.data;
            localDataMgr.set('access_token', data.access_token);
            setUser(getUser());
            if (user.waka) {
              updateLoading(false);
              toast.success('Wakatime connected successfully!');
            }
          }
        })
        .catch(err => {
          toast.error('Something went wrong');
          toast.error(err.message);
          updateLoading(false);
        });
    };
    if (code) {
      handleConnect(code);
    }
  }, []);
  return (
    <div
      className={`${theme} flex w-screen h-screen overflow-hidden dark:bg-black dark:text-gray-300`}
    >
      {isLoggedIn
        ? (
          <>
            <SideBar />
            <ToastContainer />
            <div className=' pt-20 md:pt-5 md:px-8 px-2  w-full col-span-2 overflow-y-scroll dark:bg-dark dark:text-gray-300 relative'>
              {!user?.waka && (
                <p className='absolute right-4 text-red-700 uppercase animate-pulse dark:text-red-500'>
                  please connect wakatime!!
                </p>
              )}
              <Outlet />
            </div>
          </>
          )
        : (
          <Navigate to='/' replace />
          )}
    </div>
  );
};

export default Authenticated;
