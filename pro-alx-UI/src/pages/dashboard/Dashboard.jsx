import { useCustomQuery, useCustomMutation } from '../../hooks/useCustomQuery';
import TempLoader from '../../components/loader/TempLoader';
import Table from './Table';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { useUser } from '../../hooks/customContexts';
import withPagination from '../../components/Paginate';
import { teamProjects } from '../../data';
import Cohort from '../../components/details/Cohort';

// use the higher order component to add pagination to the partner's table
const PaginatedDashboard = withPagination(Table, 15);

const Dashboard = () => {
	const { user } = useUser();
	const numberOfPartners = useRef();
	const projectName = useRef();
	const { value, isInitialLoading, refetch } = useCustomQuery({
		queryKey: ['partners', user.cohort],
		endpoint: `/cohorts/${user.cohort}/needs_partners`,
	});

	const { mutateAsync: requestPartners } = useCustomMutation({
		endpoint: '/user/request_partners',
		method: 'put',
	});

	// create a list of options using project names
	const projects = teamProjects.map((project, index) => (
		<option key={index} value={project}>
			{project}
		</option>
	));

	const handleFormSubmit = async e => {
		e.preventDefault();
		// get the user input for number of partners and convert to integer
		const partners = parseInt(numberOfPartners.current.value);
		const name = projectName.current.value; // get user input for project name
		// validate project name not empty
		if (!name) {
			toast.error('Please select project');
			return;
		}
		// validate number of partners entered is either 1 or 2 and can't be empty
		if (![1, 2].includes(partners)) {
			toast.error('please select number of partners');
			return;
		}
		try {
			// make use of useMutation to handle form data submission to server
			const res = await requestPartners({
				requested_partners: partners,
				requested_project: name,
			});
			if (res.status === 201) {
				toast.success('Successful!');
				refetch();
			} else {
				toast.error('An error occurred');
			}
		} catch (err) {
			toast.error('An error occurred');
		}
	};

	if (isInitialLoading) return <TempLoader />;

	// check if a user has a cohort number else prompt for input
	if (!user.cohort) {
		return (
			<>
				<div className='bg-blur opacity-90 fixed z-[10] inset-0 h-screen' />
				<Cohort />
			</>
		);
	}
	return (
		<div className='w-full font-light flex flex-col mt-4 md:mt-0'>
			<h2 className='font-bold text-xl'>Find a Partner</h2>

			<div className='self-end mb-[3rem] md:px-[2rem] w-3/4 md:w-fit flex flex-col'>
				<span className='text-sm block py-2 text-right '>
					Request for a partner
				</span>
				<form onSubmit={handleFormSubmit} className='self-end text-right'>
					<fieldset className='flex gap-3 pb-3'>
						<select
							ref={projectName}
							name='requested_project'
							className='md:px-2 rounded-md py-1 focus:outline-none shadow-ul outline-none self-end dark:bg-blur w-28'
						>
							<option defaultValue='' value={''}>
								Project
							</option>
							{projects}
						</select>
						<select
							name='requested_partners'
							id='requested_partners'
							ref={numberOfPartners}
							className='md:px-3 rounded-md py-1 focus:outline-none shadow-ul outline-none self-end dark:bg-blur'
						>
							<option value='' defaultValue={''}>
								Partners
							</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
						</select>
					</fieldset>
					<Button
						type='submit'
						value='Request'
						className='border-none bg-dark-blue px-2 rounded-md py-1 ml-2 text-body'
					/>
				</form>
			</div>
			<div className='px-3 md:px-0'>
				<PaginatedDashboard data={value} />
			</div>
			<p className='font-thin text-sm text-gray-600 mt-4'>
				Statistics displayed for{' '}
				<span className='text-sky-500'>last 7 days</span>
			</p>
			<br />
			<p>
				See{' '}
				<Link
					to='/leaderboard'
					className='text-blue-400 hover:text-blue-500 hover:underline'
				>
					Leaderboard
				</Link>
			</p>
		</div>
	);
};

export default Dashboard;
