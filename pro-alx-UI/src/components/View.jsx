import { MdOutlineAlternateEmail } from 'react-icons/md';
import { BsTwitter } from 'react-icons/bs';
import SmallLoader from './loader/SmallLoader';
import { IoLocationSharp, IoLogoWhatsapp, IoLogoGithub } from 'react-icons/io5';
import PropTypes from 'prop-types';
import UserChart from './details/UserChart';

export const ImageName = ({ name, photo_url, cohort_number }) => {
	return (
		<div className='flex items-center justify-start gap-4 pb-2 ml:flex-col ml:items-start'>
			<img
				src={photo_url}
				alt={`profile picture of ${name}`}
				className='mb-3 rounded-lg h-2/4 w-1/2 md:w-3/5'
			/>
			<div className='flex gap-1 items-start text-lg pb-4 flex-col ml:flex-row ml:items-center ml:gap-3'>
				<span className='text-2xl'>{name}</span>
				{cohort_number && (
					<span className='text-sm'>{`Cohort ${cohort_number}`}</span>
				)}
			</div>
		</div>
	);
};

ImageName.propTypes = {
	name: PropTypes.string,
	photo_url: PropTypes.string,
	cohort_number: PropTypes.number,
};

export const Details = ({ user }) => {
	const span = 'flex gap-2 items-center py-2 text-xl';
	const iconStyle = 'text-2xl';
	return (
		<div>
			<span className={span}>
				<IoLogoGithub className={iconStyle} />
				<a
					href={`https://github.com/${user?.github_login}`}
					className=' hover:underline'
					target='_blank'
					rel='noreferrer'
				>
					{user?.github_login}
				</a>
			</span>
			<span className={span}>
				<IoLocationSharp className={iconStyle} />
				{user?.timezone || '-'}
			</span>
			<span className={span}>
				<MdOutlineAlternateEmail className={`${iconStyle} text-bar-dark`} />{' '}
				{user?.email || '-'}
			</span>
			<span className={`${span}`}>
				<IoLogoWhatsapp className={`${iconStyle} text-green-700`} />{' '}
				{user?.whatsapp || '-'}
			</span>

			<span className={`${span}`}>
				<BsTwitter className={`${iconStyle} text-blue-600`} />
				<a
					href={`https://twitter.com/${user?.twitter_username}`}
					className='text-blue-500 hover:underline'
					target='_blank'
					rel='noreferrer'
				>
					{user?.twitter_username}
				</a>
			</span>
			<span>
				{`most active time - ${
					user?.most_active_time ? user?.most_active_time : 'not available'
				}`}
			</span>
			{user?.requested_partners && (
				<p className='py-4 border-y my-3 dark:border-gray-700 text-blue-900'>
					<span>
						{`${user?.name} currently needs ${user?.requested_partners} Partner(s) for the ${user?.requested_project} team project`}
					</span>
					<span className='inline-block'>{`Date requested: ${user?.last_request_date}`}</span>
				</p>
			)}
		</div>
	);
};

Details.propTypes = {
	user: PropTypes.object,
};

export const DisplayChart = ({ waka_stats, git_stats }) => {
	// checks if the wakatime stats for a user has data
	const isWakaEmpty = Object.values(waka_stats || []).every(
		item => Object.values(item).length > 0
	);

	if (!waka_stats && !git_stats) return <SmallLoader />;

	return (
		<>
			{/* use wakatime stats if it contains data otherwise display github commits */}
			{isWakaEmpty && !waka_stats?.error ? (
				<UserChart value={waka_stats} />
			) : (
				<UserChart value={git_stats} isGithubData={true} />
			)}
		</>
	);
};

DisplayChart.propTypes = {
	waka_stats: PropTypes.object,
	git_stats: PropTypes.object,
};

export const OverLay = () => {
	return <div className='bg-blur opacity-90 fixed z-[10] inset-0 h-screen' />;
};
