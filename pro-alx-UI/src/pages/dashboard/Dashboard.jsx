import styles from './dashboard.module.css';
import ConnectWakatime from '../../components/login/ConnectWakatime';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Dashboard = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWakaConnected, setIsWakaConnected] = useState(false);
  useEffect(() => {
    setIsConnecting(true);
    axios.get('http://localhost:5000/api/v1/wakatime/status', { withCredentials: true })
      .then((res) => {
        setIsWakaConnected(res.status === 200);
        setIsConnecting(false);
      })
      .catch(err => {
        console.log(err);
        setIsWakaConnected(false);
      });
  }, []);
  return (
    <div className={styles.home}>
      <h2>Dashboard</h2>
      {isConnecting
        ? (<p className={styles}>Connecting to wakatime...</p>)
        : (
          <ConnectWakatime isWakaConnected={isWakaConnected} setIsWakaConnected={setIsWakaConnected} setIsConnecting={setIsConnecting} />
          )}
    </div>
  );
};

export default Dashboard;
