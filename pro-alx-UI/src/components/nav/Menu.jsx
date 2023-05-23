//import Button  from "../Button";
import Login from '../login/Login';
//import { Link } from "react-router-dom";
import styles from './navbar.module.css';
import NavLinks from './NavLinks';
import PropTypes from 'prop-types';

const Menu = ({ setIsOpen }) => {
	const handleClick = () => {
		setIsOpen(false);
	};
	return (
		<div className={styles.mobile_view}>
			<NavLinks handleClick={handleClick} />
			<Login setIsOpen={setIsOpen} />
		</div>
	);
};

Menu.propTypes = {
	isOpen: PropTypes.bool,
	setIsOpen: PropTypes.func,
};

export default Menu;

/*
          (
				<nav className={styles.nav_menu}>
					<ul className={styles.list}>
						<li className={styles.list_items}>
							<Link to={'/'}>About</Link>
						</li>
						<li className={styles.list_items}>
							<Link to={'/setup'}>Setup Wakatime</Link>
						</li>
						<li className={styles.list_items}>
							<Link to={'/setup'}>Contact</Link>
						</li>
					</ul>
					<Login />
				</nav>
			)}
		</div>
	);
*/
