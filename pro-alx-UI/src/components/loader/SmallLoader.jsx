import { AiOutlineLoading } from 'react-icons/ai';

const SmallLoader = () => {
  return (
    <div className='relative flex items-center h-screen justify-center'>
      <h2 className='animate-spin text-[4rem] absolute self-center'>
        <AiOutlineLoading className='dark:text-bar-dark text-bar-dark transition transform ease-in' />
      </h2>
    </div>
  );
};

export default SmallLoader;
