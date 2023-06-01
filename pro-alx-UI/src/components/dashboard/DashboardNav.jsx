import { MdHome, MdLeaderboard, MdSettings } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const DashboardNav = ({ handleClick = () => {} }) => {
	return (
		<nav className=''>
			<ul className='list-none'>
				<li className=''>
					<NavLink
						to={'dashboard'}
						className={({ isActive }) => (isActive ? 'active' : 'inactive')}
						onClick={handleClick}
					>
						<MdHome />
						Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink
						to={'leaderboard'}
						className={({ isActive }) => (isActive ? 'active' : 'inactive')}
						onClick={handleClick}
					>
						<MdLeaderboard />
						Leaderboard
					</NavLink>
				</li>

				<li>
					<NavLink
						to={''}
						className={({ isActive }) => (isActive ? 'active' : 'inactive')}
						onClick={handleClick}
					>
						<MdSettings />
						Settings
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

DashboardNav.propTypes = {
	handleClick: PropTypes.func,
};

export default DashboardNav;
