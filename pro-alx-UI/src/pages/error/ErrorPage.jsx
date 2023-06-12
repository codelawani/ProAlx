import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const ErrorPage = () => {
  const navigate = useNavigate();
  const style =
		'border-2 border-red-950 p-2 px-4 hover:bg-red-950 hover:text-white transition ease-in-out duration-300';
  return (
    <div className='h-screen relative bg-[url("../src/assets/shape1.png")] bg-no-repeat md:bg-right-bottom flex flex-col items-center justify-center bg-cover bg-center px-4'>
      <h2 className='text-9xl md:text-[13rem] font-bold bg-clip-text bg-gradient-to-tl from-dark to-red-900 text-transparent '>
        404
      </h2>
      <h4 className='text-2xl'>Page not found</h4>
      <p className='text-sm py-2 text-center'>
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted
      </p>
      <Button value='Go back' handleClick={() => navigate(-1)} style={style} />
    </div>
  );
};

export default ErrorPage;
