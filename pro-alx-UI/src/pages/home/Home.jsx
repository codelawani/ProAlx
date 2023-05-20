import { useState } from 'react';
import Navbar from '../../components/nav/Navbar';
import styles from './home.module.css';
import Dashboard from '../dashboard/Dashboard';

const Home = () => {
	const [user, setUser] = useState(localStorage.getItem('user'));
    const [isLoading, setIsLoading] = useState(false);

	if (isLoading) return <p className={styles}>Logging you in...</p>;

	return (
		<>
			<div className={styles.header}>
				<h1>ProAlx</h1>
				<Navbar setUser={setUser} setIsLoading={setIsLoading} />
			</div>
			{user && <Dashboard />}
		</>
	);
};

export default Home;
