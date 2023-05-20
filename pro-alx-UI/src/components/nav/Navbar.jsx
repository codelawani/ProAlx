import { Link } from 'react-router-dom';
import Login from '../login/Login';
import styles from './navbar.module.css';
import PropTypes from 'prop-types';

const Navbar = ({ setUser, setIsLoading }) => {
	return (
		<nav className={styles.nav_menu}>
			<ul className={styles.list}>
				<li className={styles.list_items}>
					<Link to={'/'}>About</Link>
				</li>
			</ul>
			<Login setUser={setUser} setIsLoading={setIsLoading} />
		</nav>
	);
};

export default Navbar;

Navbar.propTypes = {
	setUser: PropTypes.func,
	setIsLoading: PropTypes.func,
};
