import { useEffect, useRef } from 'react';
import Header from '../../components/nav/Header';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/UseUserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer';
import Main from '../../components/Main';
import localDataMgr from '../../hooks/localDataMgr';
const URL = 'http://127.0.0.1:5000/api/v1';

const Home = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, updateLoading, isLoading } = useUser();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const handleLogin = (code) => {
      updateLoading(true);
      axios
        .get(`${URL}/github/login?code=${code}`, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.headers);
            const data = res.data;
            console.log(data.name);
            setIsLoggedIn(true);
            localDataMgr.set('user', data.name);
            updateLoading(false);
            navigate('dashboard');
          }
        })
        .catch((err) => {
          toast.error('Something went wrong');
          toast.error(err.message);
          updateLoading(false);
          navigate('/');
        });
    };

    if (code) {
      handleLogin(code);
    }
  }, []);
  if (isLoading) {
    return (
      <div className=''>
        <h2 className=''>🌀</h2>
      </div>
    );
  }

  return (
    <div className=''>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
