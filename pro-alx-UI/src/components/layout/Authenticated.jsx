import { useUser } from '../../hooks/UseUserContext';
import { Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../dashboard/Bar';

const Authenticated = () => {
	const { isLoggedIn } = useUser();
	return (
		<div>
			{isLoggedIn ? (
				<div className='relative'>
					<SideBar />
					<ToastContainer />
					<div className='md:absolute top-5 pt-20 left-36 md:pt-0 px-3 md:px-0'>
						<Outlet />
					</div>
				</div>
			) : (
				<Navigate to='/' replace />
			)}
		</div>
	);
};

export default Authenticated;
