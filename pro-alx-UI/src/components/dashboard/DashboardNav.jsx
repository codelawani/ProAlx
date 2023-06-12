import { MdHome, MdLeaderboard } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TfiEmail } from 'react-icons/tfi';

const DashboardNav = ({ handleClick = () => {} }) => {
  return (
    <nav className='md:pt-3 uppercase font-mono text-sm font-bold'>
      <ul className='list-none'>
        <li className='relative group flex w-fit pb-2 '>
          <NavLink
            to='dashboard'
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            onClick={handleClick}
          >
            <MdHome style={{ fontSize: '1.5rem' }} />
            <span className=''>Dashboard</span>
          </NavLink>
        </li>
        <li className='relative group flex w-fit pb-2'>
          <NavLink
            to='leaderboard'
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            onClick={handleClick}
          >
            <MdLeaderboard style={{ fontSize: '1.5rem' }} />
            <span className=''>Leaderboard</span>
          </NavLink>
        </li>

        {/* <li className='relative group flex w-fit'>
					<NavLink
						to='settings'
						className={({ isActive }) => (isActive ? 'active' : 'inactive')}
						onClick={handleClick}
					>
						<MdSettings style={{ fontSize: '1.5rem' }} />
						<span className=''>Settings</span>
					</NavLink>
				</li> */}
        <li className='relative group flex w-fit'>
          <NavLink
            to='contact'
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            onClick={handleClick}
          >
            <TfiEmail style={{ fontSize: '1.5rem' }} />
            <span className=''>contact us</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

DashboardNav.propTypes = {
  handleClick: PropTypes.func
};

export default DashboardNav;
