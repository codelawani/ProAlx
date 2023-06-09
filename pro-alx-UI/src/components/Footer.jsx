// import NavLinks from "../nav/NavLinks";

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <footer className=' text-blackflex-col dark:bg-dark bg-body dark:text-gray-300  pt-[7rem] px-16 pb-4 md:pb-7'>
      <div className='bg-white  flex justify-between gap-1 md:flex-row p-2 rounded dark:bg-inherit'>
        <div>
          <h2 className='font-bold text-3xl bg-clip-text dark:bg-yellow text-transparent hover:opacity-80 transform hover:scale-[0.9] dark:via-main md:mb-3 bg-bar-dark '>
            ProAlx
          </h2>
          <span>Find the right partner easily</span>
        </div>
        <ul className='flex flex-col justify-between gap-3'>
          <li>Contact Us</li>
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
