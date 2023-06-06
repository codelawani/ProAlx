import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/nav/Header';
import Footer from './components/Footer';
import { useTheme } from './hooks/customContexts';

function App () {
  const { theme } = useTheme();
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
