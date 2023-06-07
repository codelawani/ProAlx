import { MdHome, MdLeaderboard, MdSettings } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const DashboardNav = ({ handleClick = () => {} }) => {
	return (
		<nav className='md:pt-3 uppercase font-mono text-sm font-bold'>
			<ul className='list-none text-dark dark:text-body '>
				<li className='relative group flex w-fit pb-2 '>
					<NavLink
						to='dashboard'
						className={({ isActive }) =>
							isActive ? 'active dark:text-dark' : 'inactive'
						}
						onClick={handleClick}
					>
						<MdHome style={{ fontSize: '1.5rem' }} />
						<span className=''>Dashboard</span>
					</NavLink>
					{/* <span className='group-hover:opacity-100 transition-opacity bg-red-950 px-1 text-sm text-white rounded-md absolute left-full p-2 opacity-0 -m-4 mx-auto'>
            Dashboard
          </span> */}
				</li>
				<li className='relative group flex w-fit pb-2'>
					<NavLink
						to='leaderboard'
						className={({ isActive }) =>
							isActive ? 'active dark:text-dark' : 'inactive'
						}
						onClick={handleClick}
					>
						<MdLeaderboard style={{ fontSize: '1.5rem' }} />
						<span className=''>Leaderboard</span>
					</NavLink>
					{/* <span className='group-hover:opacity-100 transition-opacity bg-red-950 px-1 text-sm text-white rounded-md absolute left-full p-2 opacity-0 -m-4 mx-auto'>
            Leaderboard
          </span> */}
				</li>

				<li className='relative group flex w-fit'>
					<NavLink
						to=''
						className={({ isActive }) =>
							isActive ? 'active dark:text-dark' : 'inactive'
						}
						onClick={handleClick}
					>
						<MdSettings style={{ fontSize: '2rem' }} />
						<span className=''>Settings</span>
					</NavLink>
					{/* <span className='group-hover:opacity-100 transition-opacity bg-red-950 px-1 text-sm text-white rounded-md absolute left-full p-2 opacity-0 -m-4 mx-auto'>
						Settings
					</span> */}
				</li>
			</ul>
		</nav>
	);
};

DashboardNav.propTypes = {
	handleClick: PropTypes.func,
};

export default DashboardNav;
