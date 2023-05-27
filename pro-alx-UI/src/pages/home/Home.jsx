import { useState, useEffect } from 'react';
import Navbar from '../../components/nav/Navbar';
import styles from './home.module.css';
import Dashboard from '../dashboard/Dashboard';
import useLocalStorageState from '../../useLocalStorageState';
import axios from 'axios';

const apiGithub = 'http://localhost:5000/api/v1/github/';
const Home = () => {
  const [user, setUser] = useLocalStorageState('user', null);
  const [WakaUser, setWakaUser] = useLocalStorageState('wakaUser', null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    axios.get(`${apiGithub}status`, { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(res.status === 200);
      })
      .catch(err => {
        console.log(err);
        setIsLoggedIn(false);
      });
  }, []);
  if (isLoading) return <p className={styles}>Logging you in...</p>;
  return (
    <>
      <div className={styles.header}>
        <h1>ProAlx</h1>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsLoading={setIsLoading} />
      </div>
      {user && <Dashboard WakaUser={WakaUser} setWakaUser={setWakaUser} setIsLoading={setIsLoading} />}
    </>
  );
};

export default Home;
