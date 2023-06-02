import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import { GiHamburgerMenu } from 'react-icons/gi';
import Button from '../Button';
import MobileBar from './MobileBar';
import { useUser } from '../../hooks/UseUserContext';

const Bar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user } = useUser();
  const style =
		'text-black fixed bottom-10 border border-main p-2 md:static';

  const handleClick = () => {
    setShowSidebar(prev => !prev);
  };
  return (
		<header className=''>
			<div className='fixed bg-gradient-to-bl from-dark to-red-950 text-white p-4 top-0 left-0 right-0 z-40 flex justify-between items-center md:hidden'>
				<h1 className=''>
					<Link to={'/'}>ProAlx</Link>
				</h1>
				<Button
					handleClick={handleClick}
					value={<GiHamburgerMenu />}
					style=''
				/>
			</div>

			<div className='hidden fixed text-black top-0 bottom-0 left-0 px-2 z-20 border-r border-gray-400 md:flex flex-col justify-between items-center'>
				<h1 className='bg-clip-text bg-gradient-to-r from-dark to-red-950 text-transparent text-2xl font-extrabold border-b py-4'>
					<Link>ProAlx</Link>
				</h1>
				<DashboardNav />
				<Button value='wakatime' style={style} />
				<div className='flex gap-2 items-center border border-blur rounded-lg mb-2 w-fit'>
					<img
						src={user.photo_url}
						alt='profile photo'
						className='rounded-full w-10'
					/>
				</div>
			</div>

			{showSidebar && <MobileBar handleClick={handleClick} />}
		</header>
	);
};

export default Bar;
