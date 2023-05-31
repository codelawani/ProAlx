import { useUser } from '../../hooks/UseUserContext';
import { Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Authenticated = () => {
	const { isLoggedIn } = useUser();
	return (
		<div>
			{isLoggedIn ? (
				<>
					<ToastContainer />
					<Outlet />
				</>
			) : (
				<Navigate to={'/'} replace={true} />
			)}
		</div>
	);
};

export default Authenticated;
