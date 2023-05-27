import styles from './dashboard.module.css';
import ConnectWakatime from '../../components/login/ConnectWakatime';
import { PropTypes } from 'prop-types';
const Dashboard = ({ WakaUser, setWakaUser, setIsLoading }) => {
  return (
    <div className={styles.home}>
      <h2>Dashboard</h2>
      {!WakaUser && <ConnectWakatime setisWakaUser={setWakaUser} setIsLoading={setIsLoading} />}
      {WakaUser && <p>Connected to Wakatime</p>}
    </div>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  WakaUser: PropTypes.string,
  setWakaUser: PropTypes.func,
  setIsLoading: PropTypes.func
};
