import Button from '../Button';
import DashboardNav from './DashboardNav';
import { TfiClose } from 'react-icons/tfi';
import PropTypes from 'prop-types';

const MobileBar = ({ handleClick }) => {
	return (
		<>
			<div
				className='bg-black fixed top-0 bottom-0 left-0 right-0 z-10 opacity-50'
				onClick={handleClick}
			></div>
			<div className='fixed bg-dark text-white top-16  right-4 md:hidden p-4 z-50 flex flex-col'>
				<Button
					value={<TfiClose />}
					style='self-end pb-3'
					handleClick={handleClick}
				/>
				<DashboardNav handleClick={handleClick} />
			</div>
		</>
	);
};

MobileBar.propTypes = {
	handleClick: PropTypes.func,
};

export default MobileBar;
