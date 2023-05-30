import NavLinks from './NavLinks';
import Login from '../Login';

const DeskTopView = () => {
	return (
		<div className='hidden md:flex'>
			<NavLinks />
			<Login />
		</div>
	);
};

export default DeskTopView;
