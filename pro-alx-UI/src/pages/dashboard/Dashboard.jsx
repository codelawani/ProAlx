import { useUserData } from '../../hooks/fetchData';
import TempLoader from '../../components/TempLoader';
import Table from '../../components/Table';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { useRef } from 'react';
import api from '../../hooks/api';
import { toast } from 'react-toastify';
import { useUser } from '../../hooks/customContexts';
import withPagination from '../../components/Paginate';
import localDataMgr from '../../hooks/localDataMgr';

const PaginatedDashboard = withPagination(Table, 15);

const Dashboard = () => {
  const { user, setUser } = useUser();
  const numberOfPartners = useRef();
  const cohortNumber = useRef();
  const { value, isInitialLoading, refetch } = useUserData({
    queryKey: ['partners'],
    endpoint: `/cohorts/${user.cohort}/needs_partners`
  });
  console.log(value);

  const handleFormSubmit = async e => {
    e.preventDefault();
    const partners = parseInt(numberOfPartners.current.value);
    console.log('here');
    if (![1, 2].includes(partners)) {
      toast.error('field cannot be empty');
      return;
    }
    try {
      const res = await api.put(
        '/user/request_partners',
        { requested_partners: partners },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
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

  const handleCohortSubmit = async e => {
    e.preventDefault();
    const cohort = cohortNumber.current.value;
    if (cohort === '') {
      toast.error('Cohort must be a number');
      return;
    }
    try {
      const res = await api.put(
        '/user/cohort',
        { cohort_number: parseInt(cohort) },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (res.status === 201) {
        const data = res.data;
        console.log(data);
        toast('cohort updated successfully!');
        if (data.access_token) {
          localDataMgr.set('access_token', data.access_token);
          setUser(prev => ({ ...prev, cohort }));
          refetch();
        }
      } else {
        toast.error('Failed to update cohort, please try again');
      }
    } catch (err) {
      toast.error('Failed to update cohort, please try again');
    }
  };

  if (isInitialLoading) return <TempLoader />;

  // endpoint not available
  if (!user.cohort) {
    return (
  <>
      <div className='bg-blur opacity-90 fixed z-[10] inset-0 h-screen' />
      <div className='fixed transform left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-fit z-[20] bg-body rounded-xl p-[2rem]'>
      <h3 className='w-fit py-2 text-dark-blue'>
      Please enter your cohort
  				</h3>
      <form onSubmit={handleCohortSubmit} className='flex flex-col gap-5'>
      <div>
      <input
      name='cohort_number'
      id='cohort_number'
      className='border block w-full border-blur outline-none dark:bg-dark dark:text-[#e5e5e5] dark:border-blue-300 dark:border-b focus:border-blue-300 focus:border-2 rounded-md py-2 px-3'
      ref={cohortNumber}
      type='number'
      placeholder='cohort number'
    />
    </div>
      <Button
      value='Submit'
      type='submit'
      style='hover:bg-dark-blue hover:text-body border py-1 px-4 text-dark-blue mt-2 border-dark-blue self-center'
    />
    </form>
    </div>
    </>
  	);
  }
  return (
    <div className='w-full font-light flex flex-col'>
      <h2 className='font-bold text-xl'>Find a Partner</h2>

      <div className='self-end mb-[3rem] px-[2rem]'>
        <span className='text-sm block py-2'>Request for a partner</span>
        <form onSubmit={handleFormSubmit}>
          <select
            name='requested_partners'
            id='requested_partners'
            ref={numberOfPartners}
            className='px-5 rounded-md py-1 focus:outline-none shadow-ul outline-none'
          >
            <option value=''>number of partners</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
          <Button
            type='submit'
            value='Request'
            className='border-none bg-dark-blue px-2 rounded-md py-1 ml-2 text-body'
          />
        </form>
      </div>
      <PaginatedDashboard data={value} />
      <p className='font-thin text-sm text-gray-600'>
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
