import { useState } from 'react';
import Navbar from '../../components/nav/Navbar';
import styles from './home.module.css';
import Dashboard from '../dashboard/Dashboard';
import useLocalStorageState from '../../useLocalStorageState';

const Home = () => {
  const [user, setUser] = useLocalStorageState('user', null);
  const [WakaUser, setWakaUser] = useLocalStorageState('wakaUser', null);
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) return <p className={styles}>Logging you in...</p>;
  return (
    <>
      <div className={styles.header}>
        <h1>ProAlx</h1>
        <Navbar setUser={setUser} setIsLoading={setIsLoading} />
      </div>
      {user && <Dashboard WakaUser={WakaUser} setWakaUser={setWakaUser} setIsLoading={setIsLoading} />}
    </>
  );
};

export default Home;
