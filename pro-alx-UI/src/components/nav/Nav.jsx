import Menu from "./Menu";
import Login from "../login/Login";
import styles from './navbar.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { TfiClose } from 'react-icons/tfi';
import { useState } from 'react';
import Button from '../Button';
import NavLinks from "./NavLinks";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

		const style = { backgroundColor: 'inherit', borderColor: '#f25f4c' };
  return (
		<>
			<div className={styles.desktop_view}>
				<NavLinks />
				<Login />
			</div>
			<div className={styles.hamburger}>
				{isOpen ? (
					<Button
						value={<TfiClose style={{ color: '#fffffe' }} />}
						style={style}
						handleClick={() => {
							setIsOpen(false);
						}}
					/>
				) : (
					<Button
						value={<GiHamburgerMenu />}
						style={style}
						handleClick={() => {
							setIsOpen(true);
						}}
					/>
				)}
				{isOpen && <Menu isOpen={isOpen} setIsOpen={setIsOpen} />}
			</div>
		</>
	);
}

export default Nav