import { useUser, useTheme } from '../../hooks/customContexts';
import { Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../dashboard/Bar';

const Authenticated = () => {
  const { isLoggedIn } = useUser();
  const { theme } = useTheme();
  return (
    <div
      className={`${theme} flex w-screen h-screen overflow-hidden dark:bg-black dark:text-gray-300`}
    >
      {isLoggedIn
        ? (
          <>
            <SideBar />
            <ToastContainer />
            <div className=' pt-20 md:pt-5 md:px-8 px-2  w-full col-span-2 overflow-y-scroll dark:bg-black dark:text-gray-300'>
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
