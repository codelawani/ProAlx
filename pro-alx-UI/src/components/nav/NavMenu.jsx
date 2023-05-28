import MobileView from './MobileView';
import DeskTopView from './DeskTopView';
import { GiHamburgerMenu } from 'react-icons/gi';
import { TfiClose } from 'react-icons/tfi';
import { useState } from 'react';
import Button from '../Button';

const NavMenu = () => {
	const [mobileMenu, setMobileMenu] = useState(false);

	const current = mobileMenu ? <TfiClose /> : <GiHamburgerMenu />;

	const openMobileNav = () => {
		setMobileMenu(prev => !prev);
	};
	const style = 'md:hidden text-white text-2xl';
	return (
		<nav className='text-white'>
			<DeskTopView />
			<Button value={current} handleClick={openMobileNav} style={style} />
			{mobileMenu && <MobileView />}
		</nav>
	);
};

export default NavMenu;
