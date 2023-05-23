import Hero from '../hero/Hero';
import styles from './navbar.module.css';
import Nav from './Nav';

const Header = () => {
	return (
		<header>
			<div className={styles.header}>
				<h1>ProAlx</h1>

				<Nav />
			</div>
			<Hero />
		</header>
	);
};

export default Header;
