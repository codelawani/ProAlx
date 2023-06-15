import { useEffect } from 'react';
import Hero from '../../components/home/Hero';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/customContexts';
import axios from 'axios';
import { toast } from 'react-toastify';
import Main from '../../components/home/Main';
import localDataMgr, { getUser } from '../../utils/localDataMgr';
import TempLoader from '../../components/loader/TempLoader';

const { VITE_API_URL: URL } = import.meta.env;

const Home = () => {
  const navigate = useNavigate();
  const { updateLoading, isLoading, setIsLoggedIn, setUser, user } = useUser();
  useEffect(() => {
    // get an object containing query parameters present in the current url
    const urlParams = new URLSearchParams(window.location.search);
    // get the code property value returned by github
    const code = urlParams.get('code');
    const handleLogin = code => {
      updateLoading(true);
      axios
        .get(`${URL}/github/login?code=${code}`)
        .then(res => {
          if (res.status === 200) {
            const data = res.data;
            setIsLoggedIn(true);
            // store access token from server in local storage
            localDataMgr.set('access_token', data.access_token);
            setUser(getUser());
            updateLoading(false);
            navigate('dashboard');
          }
        })
        .catch(err => {
          toast.error('Something went wrong');
          toast.error(err.message);
          updateLoading(false);
          navigate('/');
        });
    };

    if (code && !user) {
      handleLogin(code);
    }
  }, []);

  if (isLoading) {
    return <TempLoader />;
  }

  if (isLoading) return <TempLoader />;

  return (
    <div className='dark:bg-dark dark:text-gray-300'>
      <Hero />
      <Main />
    </div>
  );
};

export default Home;
