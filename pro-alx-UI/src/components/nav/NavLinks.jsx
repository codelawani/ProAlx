import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavLinks = ({color="white"}) => {
	return (
		<ul className={`flex flex-col md:flex-row text-${color} justify-center content-center`}>
			<li className='pr-2'>
				<Link to={'/'}>About</Link>
			</li>
			<li className='pr-2'>
				<Link to={'contact'}>Contact</Link>
			</li>
			<li className='pr-2'>
				<Link to={'/'}>Setup Wakatime</Link>
			</li>
		</ul>
	);
};

NavLinks.propTypes = {
	color: PropTypes.string,
}

export default NavLinks;
