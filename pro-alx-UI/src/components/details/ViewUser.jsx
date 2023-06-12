import { useCustomQuery } from '../../hooks/useCustomQuery';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../Button';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import SmallLoader from '../loader/SmallLoader';
import { Details, DisplayChart, ImageName } from './View';
//import { dataset } from '../../data';

const ViewUser = () => {
	const { id } = useParams();
	const {
		value: { user, git_stats, waka_stats } = {
			user: null,
			git_stats: null,
			waka_stats: null,
		},
		isLoading,
	} = useCustomQuery({
		queryKey: ['user', id],
		endpoint: `/users/${id}/details`,
	});

	const navigate = useNavigate();

	// display loader while data is being fetched
	if (isLoading) return <SmallLoader />;

	return (
		<section className='px-4 md:px-2 py-5 mt-3 relative'>
			<div className='flex items-center justify-end mb-11 md:px-10'>
				<Button
					value={
						<span className='flex items-center text-sm '>
							<MdOutlineArrowBackIosNew style={{ fontSize: '1.3rem' }} />
							Go back
						</span>
					}
					handleClick={() => navigate(-1)}
					style=' border py-2 px-3 rounded-lg hover:bg-yellow shadow-ul text-dark-blue  dark:text-body hover:text-white dark:hover:text-dark border-warm dark:bg-bar'
				/>
			</div>

			<div className='flex flex-col ml:flex-row lg:grid ml:gap-3 lg:justify-between lg:grid-cols-5 justify-center items-center lg:content-between lg:px-2'>
				<div className='lg:col-span-2'>
					<ImageName
						name={user?.name}
						photo_url={user?.photo_url}
						cohort_number={user?.cohort_number}
					/>
					<Details user={user} />
				</div>

				<div className='w-full flex items-center flex-col justify-center lg:col-span-3 lg:self-end pt-9 lg:pt-0 h-full'>
					<DisplayChart waka_stats={waka_stats} git_stats={git_stats} />
				</div>
			</div>
		</section>
	);
};

export default ViewUser;
