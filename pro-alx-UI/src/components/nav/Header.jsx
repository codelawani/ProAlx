import { Link } from 'react-router-dom';
import NavMenu from './NavMenu';

const Header = () => {
  return (
    <header className='relative'>
      <div
        className='flex  justify-between
			bg-gradient-to-bl from-dark to-red-950 p-6  fixed inset-x-0 top-0'
      >
        <h1 className='text-white font-bold text-2xl hover:border-b hover:border-main rounded hover:px-2'>
          <Link to='/'>ProAlx</Link>
        </h1>
        <NavMenu />
      </div>
    </header>
  );
};

export default Header;
