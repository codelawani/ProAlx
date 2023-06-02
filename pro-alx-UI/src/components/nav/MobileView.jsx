import NavLinks from './NavLinks';
import LoginWithGithub from '../GithubLogin';
import { TfiClose } from 'react-icons/tfi';
import Button from '../Button';
import PropTypes from 'prop-types';
import Theme from '../Theme';

const MobileView = ({ openMobileNav }) => {
	const style = 'text-black dark:text-gray-300';

	const closeButtonStyle =
		'absolute top-4 right-5 text-black dark:text-gray-300';
	return (
		<>
			<div
				className='bg-black fixed top-0 bottom-0 left-0 right-0 z-10 opacity-50 dark:bg-body '
				onClick={openMobileNav}
			/>
			<div className='md:hidden fixed  right-5 bg-body p-6 z-40 flex flex-col gap-2 items-start rounded transition ease-in-out transform dark:bg-black dark:text-gray-300'>
				<Button
					value={<TfiClose />}
					handleClick={openMobileNav}
					style={closeButtonStyle}
				/>
				<NavLinks color='black' handleClick={openMobileNav} />
				<LoginWithGithub style={style} openMobileNav={openMobileNav} />
				<Theme />
			</div>
		</>
	);
};

MobileView.propTypes = {
	openMobileNav: PropTypes.func.isRequired,
};

export default MobileView;
