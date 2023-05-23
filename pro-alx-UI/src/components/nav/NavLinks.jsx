import { Link } from 'react-router-dom';
//import Login from '../login/Login';
import styles from './navbar.module.css';
import PropTypes from "prop-types";


const NavLinks = ({handleClick=null}) => {
	return (
		<nav className={styles.nav_menu}>
			<ul className={styles.list}>
				<li className={styles.list_items} onClick={handleClick}>
					<Link to={'/'}>About</Link>
				</li>
				<li className={styles.list_items} onClick={handleClick}>
					<Link to={'contact'}>Contact</Link>
				</li>
				<li className={styles.list_items} onClick={handleClick}>
					<Link to={'/'} onClick={handleClick}>
						Setup Wakatime
					</Link>
				</li>
			</ul>
		</nav>
	);
};

NavLinks.propTypes = {
	handleClick: PropTypes.func,
}

export default NavLinks;
