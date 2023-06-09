// import NavLinks from "../nav/NavLinks";

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <footer className=' text-black flex justify-between gap-1 md:flex-row flex-col dark:bg-dark bg-body dark:text-gray-300  pt-[7rem] px-16 pb-4 md:pb-7'>
      <div>
        <h2 className='font-bold text-3xl bg-clip-text bg-yellow text-transparent hover:opacity-80 transform hover:scale-[0.9] dark:via-main md:mb-3'>
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
    </footer>
  );
};

export default Footer;
