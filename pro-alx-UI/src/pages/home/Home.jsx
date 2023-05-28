import { useEffect, useRef } from 'react';
import Header from '../../components/nav/Header';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/UseUserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer';
import Main from '../../components/Main';

const URL = 'http://127.0.0.1:5000/api/v1';

const Home = () => {
	
	const navigate = useNavigate();
	const { setUser, user, updateLoading, isLoading, setIsLoggedIn } = useUser();
	let code = useRef(null);
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		code.current = urlParams.get('code');
		
		const handleLogin = async code => {
			updateLoading(true);
			try {
				const res = await axios.get(`${URL}/user/login?code=${code.current}`);
				const data = res.data;
				localStorage.setItem('user', JSON.stringify(data));
				setUser(data);
				setIsLoggedIn(true);
				toast.success('login successful!');
				updateLoading(false);
				navigate('dashboard');
			} catch (err) {
				toast.error('something went wrong');
				toast.error(err.message);
				updateLoading(false);
				navigate('/');
			}
		};
		
		if (code.current) {
			if (!user) {
				handleLogin(code);
			}
		}
	}, [code, setIsLoggedIn, navigate, user, updateLoading, setUser]);
	
	
	
	if (isLoading)
		return (
			<div className="">
				<h2 className="">🌀</h2>
			</div>
		);

	return (
		<div className=''>
			<Header />
			<Main/>
			<Footer />
		</div>
	);
};

export default Home;
