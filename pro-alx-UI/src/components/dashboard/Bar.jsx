import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import { GiHamburgerMenu } from 'react-icons/gi';
import Button from '../Button';
import MobileBar from './MobileBar';
import { useUser } from '../../hooks/customContexts';
import Login from '../GithubLogin';
import Theme from '../Theme';
const Bar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user } = useUser();

  const style =
		'hover:bg-primary py-2 hover:text-white hover:border-white dark: text-sm uppercase font-mono font-bold text-blue-500 border py-1';
  const { VITE_WAKA_ID: CLIENT_ID } = import.meta.env;
  const handleClick = () => {
    setShowSidebar(prev => !prev);
  };
  const handleConnect = () => {
    const scope = 'email read_stats read_logged_time';
    const redirectUrl = 'http://localhost:5173/dashboard';
    const query = `response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}&scope=${scope}`;
    window.location.assign(`https://wakatime.com/oauth/authorize?${query}`);
  };
  return (
    <header className=''>
      <div className='fixed dark:bg-[#010414] bg-main dark:text-white px-[3rem] top-0 inset-x-0 z-40 flex justify-between items-center shadow-ul md:hidden py-[1.5rem] text-dark-blue'>
        <h1 className='text-2xl font-bold'>
          <Link to='dashboard'>ProAlx</Link>
        </h1>
        <Button
          handleClick={handleClick}
          value={<GiHamburgerMenu />}
          style=''
        />
      </div>

      <div className='hidden w-fit top-0 bottom-0 left-0 md:px-2 lg:px-4 xl:px-2 z-20 border-r h-full md:flex flex-col items-left dark:bg-[#010414] bg-main text-dark pb-[5rem] dark:text-body'>
        <h1 className='bg-dark dark:bg-warm bg-clip-text text-transparent text-3xl font-extrabold border-b py-4 text-center mb-3'>
          <Link to='/dashboard'>ProAlx</Link>
        </h1>
        <div className='flex flex-col justify-between w-full h-full items-left'>
          <DashboardNav />
          <Theme />

          <div className='flex flex-col gap-2 mb-2 w-fit items-start'>
            {!user?.waka && (
              <Button
                value='connect wakatime'
                style={style}
                handleClick={handleConnect}
              />
            )}

            <Link to='contact' className='capitalize' onClick={handleClick}>
              contact us
            </Link>

            <Login style=' hover:bg-primary py-1 hover:text-white  self-start' />
            <div className='flex gap-2 items-center'>
              <img
                src={user.photo_url}
                alt='profile photo'
                className='rounded-full w-10  border border-blur'
              />
              <span>{user.name}</span>
            </div>
          </div>
        </div>
      </div>

      {showSidebar && (
        <MobileBar handleClick={handleClick} showSidebar={showSidebar} />
      )}
    </header>
  );
};
export default Bar;
