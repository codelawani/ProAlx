import { Outlet, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/nav/Header';
import Footer from './components/home/Footer';
import { useTheme, useUser } from './hooks/customContexts';

function App () {
  const { theme } = useTheme();
  const { user } = useUser();

  if (user) return <Navigate to='/dashboard' replace />;

  return (
    <div className={`${theme} dark:bg-dark`}>
      <Header />
      <ToastContainer />
      <div className='mt-20'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
