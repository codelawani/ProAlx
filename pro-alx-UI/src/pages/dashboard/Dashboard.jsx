import { useCustomQuery, useCustomMutation } from '../../hooks/useCustomQuery';
import TempLoader from '../../components/loader/TempLoader';
import Table from './Table';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useUser } from '../../hooks/customContexts';
import withPagination from '../../components/Paginate';
import { teamProjects } from '../../data';
import Cohort from '../../components/details/Cohort';
import { TfiClose } from 'react-icons/tfi';

// use the higher order component to add pagination to the partner's table
const PaginatedDashboard = withPagination(Table, 30);

const Dashboard = () => {
	const [method, setMethod] = useState('');
	const { user } = useUser();
	const numberOfPartners = useRef();
	const projectName = useRef();
	const navigate = useNavigate();
	const [showPopup, setShowPopup] = useState(false);
	const { value, isInitialLoading } = useCustomQuery({
		queryKey: ['partners', user.cohort],
		endpoint: `/cohorts/${user.cohort}/needs_partners`,
		staleTime: 5 * 60 * 1000,
	});

	const { mutateAsync: requestPartners } = useCustomMutation({
		endpoint: '/user/request_partners',
		method: method,
		firstKey: ['partners', user.cohort],
		secondKey: ['profile'],
	});

	// create a list of options using project names
	const projects = teamProjects.map((project, index) => (
		<option key={index} value={project}>
			{project}
		</option>
	));

	// get the index of the current user from the partner's list if it exists
	const idExistsIndex = value?.findIndex(obj => obj.id === user.id);

	const handleFormSubmit = async e => {
		e.preventDefault();
		setMethod('put');
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
				projectName.current.value = '';
				numberOfPartners.current.value = '';
				toast.success('Successful!');
				setShowPopup(true);
			} else {
				toast.error('An error occurred');
			}
		} catch (err) {
			toast.error('An error occurred');
		}
	};

	const handleRemovalFromList = async () => {
		setMethod('delete');
		const res = await requestPartners();
		if (res.status === 200) {
			toast.success("You're no longer on the list");
		} else {
			toast.error('Failed to get off list');
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
		<div className='w-full font-light flex flex-col mt-4 md:mt-0 pb-10'>
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
							className='md:px-2 pl-1 rounded-md py-1 focus:outline-none shadow-ul outline-none self-end dark:bg-blur w-28'
							disabled={idExistsIndex >= 0 ? true : false}
						>
							<option defaultValue='' value=''>
								Project
							</option>
							{projects}
						</select>
						<select
							name='requested_partners'
							id='requested_partners'
							ref={numberOfPartners}
							className='md:px-3 pl-1 rounded-md py-1 focus:outline-none shadow-ul outline-none self-end dark:bg-blur'
							disabled={idExistsIndex >= 0 ? true : false}
						>
							<option value='' defaultValue=''>
								Partners
							</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
						</select>
					</fieldset>
					{/* show the cancel button if the user is already on the partner's list otherwise show request to get added to the list */}
					<Button
						type={idExistsIndex >= 0 ? 'button' : 'submit'}
						value={idExistsIndex >= 0 ? 'Cancel' : 'Request'}
						className='border-none bg-dark-blue px-2 rounded-md py-1 ml-2 text-body'
						handleClick={idExistsIndex >= 0 ? handleRemovalFromList : () => {}}
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

			<div>
				{showPopup && (
					<>
						<div className='bg-blur opacity-90 fixed z-[10] inset-0 h-screen' />
						<div className='fixed transform left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3/4 md:w-fit z-[20] rounded-xl p-[2rem] bg-bar flex flex-col text-body'>
							<Button
								value={<TfiClose />}
								handleClick={() => setShowPopup(false)}
								style='self-end text-2xl'
							/>
							<p className='py-5 tracking-wider'>
								Ensure your profile is updated with your latest contact details
								so others can contact you
							</p>
							<Button
								value={'view profile'}
								handleClick={() => navigate('/profile')}
								style='border w-fit self-center p-2 capitalize bg-yellow text-black hover:bg-body'
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
