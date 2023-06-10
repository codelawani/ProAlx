import Button from '../Button';
import { useUserData } from '../../hooks/fetchData';
import { useRef } from 'react';
import api from '../../hooks/api';
import { toast } from 'react-toastify';
import { useUser } from '../../hooks/customContexts';
import localDataMgr from '../../hooks/localDataMgr';
import PropTypes from 'prop-types';

const Cohort = ({ handleClick = () => {} }) => {
  const { setUser, user } = useUser();
  const { refetch } = useUserData({
    queryKey: ['partners'],
    endpoint: `/cohorts/${user.cohort}/needs_partners`
  });
  const style =
		'hover:bg-dark-blue hover:text-body border py-1 px-4 text-dark-blue mt-2 border-dark-blue self-center dark:text-main dark:border-warm';
  const cohortNumber = useRef();

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
        toast('Cohort updated successfully!');
        handleClick();
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
  return (
    <>
      <div
        className='bg-blur opacity-90 fixed z-[10] inset-0 h-screen dark:bg-body dark:opacity-50'
        onClick={handleClick}
      />
      <div className='fixed transform left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3/4 md:w-fit z-[20] bg-body rounded-xl p-[2rem] dark:bg-blur'>
        <h3 className='w-fit py-2 text-dark-blue dark:text-main'>
          Please enter your cohort
        </h3>
        <form onSubmit={handleCohortSubmit} className='flex flex-col gap-5'>
          <div>
            <input
              name='cohort_number'
              id='cohort_number'
              className='border block w-full border-blur outline-none dark:bg-dark dark:text-body dark:border-blue-300 dark:border-b focus:border-blue-300 focus:border-2 rounded-md py-2 px-3'
              ref={cohortNumber}
              type='number'
              placeholder='cohort number'
            />
          </div>
          <div className='flex justify-between'>
            <Button value='close' handleClick={handleClick} style={style} />
            <Button value='Submit' type='submit' style={style} />
          </div>
        </form>
      </div>
    </>
  );
};

Cohort.propTypes = {
  handleClick: PropTypes.object
};
export default Cohort;
