import { Link } from 'react-router-dom';
import NavMenu from './NavMenu';

const Header = () => {
  return (
    <header className='relative z-50'>
      <div
        className='flex  justify-between
			 p-6  fixed inset-x-0 top-0 bg-body dark:bg-dark dark:text-body'
      >
        <h1 className=' font-bold text-3xl bg-clip-text bg-cool text-transparent hover:opacity-80 transform hover:scale-[0.9]'>
          <Link to='/'>ProAlx</Link>
        </h1>
        <NavMenu />
      </div>
    </header>
  );
};

export default Header;
