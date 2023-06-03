// import NavLinks from "../nav/NavLinks";

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <footer className='pt-3 bg-gradient-to-bl py-4 text-black px-3 border-t border-red-950 flex justify-between gap-1 md:flex-row flex-col dark:bg-blur dark:text-gray-300'>
      <h3>ProAlx</h3>
      <ul>
        <li>Contact Us</li>
        <li>Documentation</li>
      </ul>
      <p className=''>&copy;{currentYear}ProAlx. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
