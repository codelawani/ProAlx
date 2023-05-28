import NavLinks from './NavLinks';
import Login from '../Login';
const MobileView = () => {
	return (
		<div className='md:hidden fixed top-20 right-0 left-0 bottom-0 bg-red-100 grid content-center justify-center pt-6'>
			<NavLinks color='black' />
			<Login style='text-black text-left' />
		</div>
	);
};

export default MobileView;
