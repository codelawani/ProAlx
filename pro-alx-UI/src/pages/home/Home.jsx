import { useEffect } from 'react';
import Hero from '../../components/Hero';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/customContexts';
import axios from 'axios';
import { toast } from 'react-toastify';
import Main from '../../components/Main';
import localDataMgr, { getUser } from '../../hooks/localDataMgr';
import TempLoader from '../../components/TempLoader';

const URL = 'http://127.0.0.1:5000/api/v1';

const Home = () => {
	const navigate = useNavigate();
	const { updateLoading, isLoading, setIsLoggedIn, setUser } = useUser();
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');
		const handleLogin = code => {
			updateLoading(true);
			axios
				.get(`${URL}/github/login?code=${code}`)
				.then(res => {
					if (res.status === 200) {
						const data = res.data;
						setIsLoggedIn(true);
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

		if (code) {
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
