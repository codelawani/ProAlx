import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import { GiHamburgerMenu } from 'react-icons/gi';
import Button from '../Button';
import MobileBar from './MobileBar';

// we'll need a property that checks if user has connected wakatime and conditionally display the connect wakatime button only when it's false e.g user.wakatimeConnected

const Bar = () => {
	const [showSidebar, setShowSidebar] = useState(false);
	const style =
		'text-white fixed md:block bottom-10 border border-main bg-dark p-2';

	const handleClick = () => {
		setShowSidebar(prev => !prev);
	};
	return (
		<header className=''>
			<div className='absolute bg-gradient-to-bl from-main to-dark p-6 top-0 left-0 right-0 z-40 flex justify-between items-center'>
				<h2>
					<Link to={'/'} className='text-white'>
						ProAlx
					</Link>
				</h2>
				<Button
					handleClick={handleClick}
					value={<GiHamburgerMenu />}
					style='md:hidden'
				/>

				<Button value={'connect wakatime'} style={style} />
			</div>
			<div className='hidden fixed bg-dark text-white top-0 bottom-0 left-0 px-1 z-20  md:flex flex-col justify-between'>
				<h2 className=''>ProAlx</h2>
				<DashboardNav />

				<div>user profile (pic + name)</div>
			</div>

			{showSidebar && <MobileBar handleClick={handleClick} />}
		</header>
	);
};

export default Bar;
