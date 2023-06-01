import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavLinks = ({ color = 'white', handleClick = () => {} }) => {
  return (
    <ul
      className={`flex flex-col md:flex-row text-${color} justify-center content-center`}
    >
      <li
        className='pr-2 hover:border-b hover:border-main rounded hover:px-2'
        onClick={handleClick}
      >
        <Link to='contact'>Contact</Link>
      </li>
      <li
        className='pr-2 hover:border-b hover:border-main rounded hover:px-2'
        onClick={handleClick}
      >
        <Link to='/'>Setup Wakatime</Link>
      </li>
    </ul>
  );
};

NavLinks.propTypes = {
  color: PropTypes.string,
  handleClick: PropTypes.func
};

export default NavLinks;
