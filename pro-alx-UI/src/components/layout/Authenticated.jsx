import { useUser, useTheme } from '../../hooks/customContexts';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../dashboard/Bar';
import { useEffect } from 'react';
import api from '../../utils/api';
import localDataMgr from '../../utils/localDataMgr';
import SmallLoader from '../loader/SmallLoader';

const Authenticated = () => {
	const { VITE_API_URL: API } = import.meta.env;
	const { theme } = useTheme();
	const { user, setUser, isLoggedIn, isLoading } = useUser();
	const navigate = useNavigate();
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');

		// wakatime authorization flow
		const handleConnect = code => {
			api
				.get(`${API}/waka/authorize?code=${code}`)
				.then(res => {
					if (res.status === 200) {
						const data = res.data;
						localDataMgr.set('access_token', data.access_token);
						setUser(prev => ({ ...prev, waka: true }));
						navigate(-1);
						toast.success('Wakatime connected successfully!');
					}
				})
				.catch(err => {
					toast.error('Error connecting Wakatime');
					toast.error(err.message);
				});
		};
		if (code && !user.waka) {
			handleConnect(code);
		}
	}, []);
	return (
		<div
			className={`${theme}  flex w-screen h-screen overflow-hidden dark:bg-black dark:text-gray-300`}
		>
			{isLoggedIn ? (
				<>
					<SideBar />
					<ToastContainer />
					<div className=' pt-20 md:pt-5 md:px-8 px-2  w-full col-span-2 overflow-y-scroll dark:bg-dark dark:text-gray-300 relative'>
						{!user?.waka && (
							<p className='absolute right-4 text-red-700 uppercase animate-pulse dark:text-red-500'>
								please connect wakatime!!
							</p>
						)}
						{isLoading && <SmallLoader />}
						<Outlet />
					</div>
				</>
			) : (
				<Navigate to='/' replace />
			)}
		</div>
	);
};

export default Authenticated;
