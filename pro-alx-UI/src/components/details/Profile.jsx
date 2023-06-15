import { useCustomQuery } from '../../hooks/useCustomQuery';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import { Details, DisplayChart, ImageName, OverLay } from './View';
import SmallLoader from '../loader/SmallLoader';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
// import { dataset } from '../../data';
import EditProfile from './EditProfile';
import Cohort from './Cohort';
import { useState } from 'react';

const Profile = () => {
	const [showModal, setShowModal] = useState({
		cohort: false,
		profile: false,
	});
	const {
		value: { user, git_stats, waka_stats } = {
			user: null,
			git_stats: null,
			waka_stats: null,
		},
		refetch,
	} = useCustomQuery({
		queryKey: ['profile'],
		endpoint: '/user/profile',
	});
	const navigate = useNavigate();

	const style =
		'border border-blue-900 text-white px-3 py-2 capitalize dark:bg-bar-light bg-bar-dark';

	const handleModalClose = key => {
		setShowModal(prev => ({ ...prev, [key]: false }));
	};

	if (!user) return <SmallLoader />;

	return (
		<div className='px-4 py-5 relative mt-3'>
			<div className='flex items-center justify-end mb-11'>
				<Button
					value={
						<span className='flex items-center text-lg '>
							<MdOutlineArrowBackIosNew style={{ fontSize: '1.3rem' }} />
							Go back
						</span>
					}
					handleClick={() => navigate(-1)}
					style=' border p-1 rounded-lg hover:bg-yellow shadow-ul text-dark-blue  dark:text-body hover:text-white dark:hover:text-dark border-warm dark:bg-bar'
				/>
			</div>

			<div className='flex flex-col ml:flex-row lg:grid ml:gap-3 lg:justify-between lg:grid-cols-5 justify-center items-center lg:content-between lg:px-2'>
				<div className='flex flex-col justify-center lg:col-span-2 '>
					<ImageName
						name={user?.name}
						photo_url={user?.photo_url}
						cohort_number={user?.cohort_number}
					/>
					<div className='flex items-center gap-10 justify-between ml:justify-start'>
						<Button
							value='edit profile'
							style={style}
							handleClick={() =>
								setShowModal(prev => ({ ...prev, profile: true }))
							}
						/>
						<Button
							value='edit cohort'
							style={style}
							handleClick={() =>
								setShowModal(prev => ({ ...prev, cohort: true }))
							}
						/>
					</div>
					<Details user={user} />
				</div>
				<div className='w-full flex items-center flex-col justify-center lg:col-span-3 lg:self-end pt-9 lg:pt-0 h-full'>
					<DisplayChart
						waka_stats={waka_stats}
						git_stats={git_stats}
						waka_connected={user?.waka_connected}
					/>
				</div>
			</div>

			{showModal.profile && (
				<>
					<OverLay />
					<EditProfile
						user={user}
						handleClick={() => handleModalClose('profile')}
						refetch={refetch}
					/>
				</>
			)}
			{showModal.cohort && (
				<>
					<OverLay />
					<Cohort
						cohortChange
						handleClick={() => handleModalClose('cohort')}
						refetch={refetch}
					/>
				</>
			)}
		</div>
	);
};

export default Profile;
