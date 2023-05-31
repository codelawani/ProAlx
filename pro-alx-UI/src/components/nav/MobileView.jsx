import NavLinks from './NavLinks';
import LoginWithGithub from '../GithubLogin';
import { TfiClose } from 'react-icons/tfi';
import Button from '../Button';
import PropTypes from "prop-types";

const MobileView = ({openMobileNav}) => {
  const style = 'text-black';
  
  const closeButtonStyle = "absolute top-4 right-5 text-black"
  return (
		<>
			<div
				className='bg-black fixed top-0 bottom-0 left-0 right-0 z-10 opacity-50'
				onClick={openMobileNav}
			></div>
			<div className='md:hidden fixed  right-5 bg-body p-6 z-40'>
        <Button value={<TfiClose />} handleClick={openMobileNav} style={closeButtonStyle}/>
				<NavLinks color='black' handleClick={openMobileNav} />
				<LoginWithGithub style={style} openMobileNav={openMobileNav} />
			</div>
		</>
	);
};

MobileView.propTypes = {
  openMobileNav: PropTypes.func.isRequired,
}

export default MobileView;
