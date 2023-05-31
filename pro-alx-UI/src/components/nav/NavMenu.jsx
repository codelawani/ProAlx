import MobileView from './MobileView';
import DeskTopView from './DeskTopView';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';
import Button from '../Button';

const NavMenu = () => {
	const [mobileMenu, setMobileMenu] = useState(false);

	const openMobileNav = () => {
		setMobileMenu(prev => !prev);
	};
	const style = 'md:hidden text-white text-2xl';
	return (
		<nav className='text-white'>
			<DeskTopView />
			<Button
				value={<GiHamburgerMenu />}
				handleClick={openMobileNav}
				style={style}
			/>
			{mobileMenu && <MobileView openMobileNav={openMobileNav} />}
		</nav>
	);
};

export default NavMenu;
