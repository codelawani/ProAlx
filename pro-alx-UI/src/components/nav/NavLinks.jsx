// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavLinks = ({ color = 'dark', handleClick = () => {} }) => {
	const scrollToSection = id => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			handleClick();
		}
	};
	return (
		<ul
			className={`flex flex-col md:flex-row text-${color} justify-center content-center dark:text-gray-300 gap-2 md:gap-1`}
		>
			{/* <li
				className='px-2 py-2 rounded-md active:outline-none transform active:scale-x-[0.8] mr-2 hover:scale-x-[1.05] transition ease-in-out hover:bg-yellow hover:text-dark'
				onClick={handleClick}
			>
				<Link to='contact'>Contact</Link>
			</li> */}
			<li
				className='px-2 py-2 rounded-md active:outline-none transform active:scale-x-[0.8] mr-2 hover:scale-x-[1.05] transition ease-in-out hover:bg-yellow hover:text-dark'
				onClick={() => scrollToSection('about')}
			>
				About Us
			</li>
		</ul>
	);
};

NavLinks.propTypes = {
	color: PropTypes.string,
	handleClick: PropTypes.func,
};

export default NavLinks;
