import { Link } from 'react-router-dom';
import NavMenu from './NavMenu';

const Header = () => {
  return (
    <header className='relative z-50'>
      <div
        className='flex  justify-between
			 p-6 px-[5rem] fixed inset-x-0 top-0 bg-white dark:bg-dark dark:text-body shadow-ul'
      >
        <h1 className=' font-bold text-3xl bg-clip-text bg-gradient-to-tl from-dark to-red-950 text-transparent hover:opacity-80 transform hover:scale-[0.9] dark:via-main'>
          <Link to='/'>ProAlx</Link>
        </h1>
        <NavMenu />
      </div>
    </header>
  );
};

export default Header;
