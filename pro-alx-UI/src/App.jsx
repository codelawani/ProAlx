import Home from './pages/home/Home';
import { UserProvider } from './hooks/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App () {
  return (
    <UserProvider>
      <Home />
      <ToastContainer />
    </UserProvider>
  );
}

export default App;
