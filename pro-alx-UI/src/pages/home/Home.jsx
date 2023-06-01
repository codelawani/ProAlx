import { useEffect } from 'react';
import Hero from '../../components/Hero';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/UseUserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Main from '../../components/Main';
import localDataMgr from '../../hooks/localDataMgr';
import TempLoader from '../../components/TempLoader';
const URL = 'http://127.0.0.1:5000/api/v1';

const Home = () => {
	const navigate = useNavigate();
	const { updateLoading, isLoading, setIsLoggedIn } = useUser();

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');
		const handleLogin = code => {
			updateLoading(true);
			axios
				.get(`${URL}/github/login?code=${code}`)
				.then(res => {
					if (res.status === 200) {
						console.log(res.headers);
						const data = res.data;
						console.log(data);
						setIsLoggedIn(true);
						localDataMgr.set('access_token', data.access_token);
						localDataMgr.set('user', data.name);
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

	if (isLoading) return <TempLoader />;

	return (
		<div className=''>
			<Hero />
			<Main />
		</div>
	);
};

export default Home;
