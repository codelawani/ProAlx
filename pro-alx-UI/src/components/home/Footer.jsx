import { Link } from 'react-router-dom';

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <footer className=' text-black dark:bg-dark bg-body dark:text-gray-300 pt-4 md:pt-[4rem] px-6 md:px-16 pb-4 md:pb-7'>
      <div className='bg-white flex-col flex justify-between gap-1 md:flex-row p-2 rounded dark:bg-inherit'>
        <div>
          <h2 className='font-bold text-3xl bg-clip-text dark:bg-yellow text-transparent hover:opacity-80 transform hover:scale-[0.9] dark:via-main md:mb-3 bg-bar-dark '>
            ProAlx
          </h2>
          <span>Unlock your productivity</span>
        </div>
        <ul className='flex flex-col justify-between gap-3'>
          <li>
            <Link to='contact'>Contact Us</Link>
          </li>
          <li>Documentation</li>
        </ul>
        <p className='md:self-end'>
          &copy;{currentYear} ProAlx. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
