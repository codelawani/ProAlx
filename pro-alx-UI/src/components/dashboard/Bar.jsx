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
		'border border-red-950 p-2 w-fit hover:bg-red-950 hover:text-white hover:border-white text-gray-400 dark:border-gray-400';

  const handleClick = () => {
    setShowSidebar(prev => !prev);
  };
  return (
    <header className=''>
      <div className='fixed bg-gradient-to-bl from-dark to-red-950 text-gray-300 p-4 top-0 left-0 right-0 z-40 flex justify-between items-center md:hidden'>
        <h1 className=''>
          <Link to='/'>ProAlx</Link>
        </h1>
        <Button
          handleClick={handleClick}
          value={<GiHamburgerMenu />}
          style=''
        />
      </div>

      <div className='hidden w-fit top-0 bottom-0 left-0 px-2 z-20 border-r h-full md:flex flex-col items-center bg-gradient-to-tl from-red-950 to-dark text-gray-300'>
        <h1 className='text-gray-500 text-2xl font-extrabold border-b py-4 '>
          <Link>ProAlx</Link>
        </h1>
        <div className='flex flex-col justify-between w-full h-full items-center'>
          <DashboardNav />

          <div className='flex flex-col gap-2 items-center mb-2 w-fit'>
            <Theme />
            <Button value='connect wakatime' style={style} />
            <img
              src={user.photo_url}
              alt='profile photo'
              className='rounded-full w-10  border border-blur'
            />
            <Login style='text-gray-300 dark:text-gray-400 hover:bg-red-950 hover:text-white px-2' />
          </div>
        </div>
      </div>

      {showSidebar && <MobileBar handleClick={handleClick} />}
    </header>
  );
};

export default Bar;
