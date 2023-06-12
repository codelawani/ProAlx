import { Link } from 'react-router-dom';
import NavMenu from './NavMenu';

const Header = () => {
	return (
		<header className='relative z-50'>
			<div
				className='flex  justify-between
			 p-6 px-[5rem] fixed inset-x-0 top-0 bg-white dark:bg-dark dark:text-body shadow-ul'
			>
				<h1 className=' font-bold text-3xl hover:opacity-80 transform hover:scale-[0.9] text-dark dark:text-white'>
					<Link to='/'>ProAlx</Link>
				</h1>
				<NavMenu />
			</div>
		</header>
	);
};

export default Header;
