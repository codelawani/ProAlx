import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import { BiMenu } from 'react-icons/bi';
import Button from '../Button';
import MobileBar from './MobileBar';
import { useUser } from '../../hooks/customContexts';
import Login from '../GithubLogin';
import Theme from '../Theme';

const Bar = () => {
	const [showSidebar, setShowSidebar] = useState(false);
	const { user } = useUser();

	const navigate = useNavigate();

	const handleClick = () => {
		setShowSidebar(prev => !prev);
	};

	return (
		<header className='md:w-1/4 lg:w-2/12'>
			<div className='fixed dark:bg-bar bg-main dark:text-white px-[3rem] top-0 inset-x-0 z-40 flex justify-between items-center shadow-ul md:hidden py-[1.5rem] text-dark-blue'>
				<h1 className='bg-dark-blue dark:bg-warm bg-clip-text text-transparent text-2xl font-extrabold text-center'>
					<Link to='dashboard'>ProAlx</Link>
				</h1>
				<Button
					handleClick={handleClick}
					value={
						<BiMenu
							style={{ fontSize: '2rem' }}
							className=' dark:text-warm-tone text-2xl font-extrabold'
						/>
					}
					style=''
				/>
			</div>

			<div className='hidden w-full top-0 bottom-0 left-0 md:px-2 lg:px-4 z-20 border-r h-full md:flex flex-col items-left dark:bg-bar bg-main text-dark pb-[5rem] xl:px-7 dark:text-body'>
				<h1 className='bg-dark dark:bg-warm bg-clip-text text-transparent text-3xl font-extrabold border-b py-4 text-center mb-3'>
					<Link to='/dashboard'>ProAlx</Link>
				</h1>
				<div className='flex flex-col justify-between w-full h-full items-left'>
					<DashboardNav />
					<Theme />

					<div className='flex flex-col gap-2 mb-2 w-fit items-start'>
						<Login style=' hover:bg-primary py-1 hover:text-white  self-start' />
						<div
							className='flex gap-2 items-center cursor-pointer hover:bg-gray-500 rounded py-1 hover:px-1 hover:pb-2 w-3/4'
							onClick={() => navigate('/profile')}
						>
							<img
								src={user.photo_url}
								alt='profile photo'
								className='rounded-full w-10  border border-blur'
							/>
							{/* <span className='truncate'>{user.name}</span> */}
						</div>
					</div>
				</div>
			</div>

			{showSidebar && (
				<MobileBar handleClick={handleClick} showSidebar={showSidebar} />
			)}
		</header>
	);
};
export default Bar;
