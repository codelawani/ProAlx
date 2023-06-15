import Button from '../Button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useUser } from '../../hooks/customContexts';
import localDataMgr from '../../utils/localDataMgr';
import PropTypes from 'prop-types';
import { useCustomMutation } from '../../hooks/useCustomQuery';

const Cohort = ({
  handleClick = () => {},
  cohortChange = false,
  refetch = () => {}
}) => {
  const { setUser, user } = useUser();
  const { mutateAsync } = useCustomMutation({
    endpoint: '/user/cohort',
    method: 'put'
  });

  const style =
		'hover:bg-dark-blue hover:text-body border py-1 px-4 text-dark-blue mt-2 border-dark-blue self-center dark:text-main dark:border-warm';

  // reference to cohort number input
  const [cohortNumber, setCohortNumber] = useState(user?.cohort);

  const handleCohortSubmit = async e => {
    e.preventDefault();

    // validate input
    if (cohortNumber === '') {
      toast.error('Cohort must be a number');
      return;
    }
    try {
      const res = await mutateAsync({
        cohort_number: parseInt(cohortNumber)
      });
      if (res.status === 201) {
        toast('cohort updated successfully!');
        // update local storage with the new token received
        localDataMgr.set('access_token', res.data.access_token);
        setUser(prev => ({ ...prev, cohortNumber }));
        refetch();
        handleClick();
      } else {
        toast.error('Failed to update cohort, please try again');
      }
    } catch (err) {
      toast.error('Failed to update cohort, please try again');
    }
  };
  return (
    <div className='fixed transform left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3/4 md:w-fit z-[20] bg-yellow rounded-xl p-[2rem] dark:bg-bar'>
      <h3 className='w-fit py-2 dark:text-body text-bar'>
        Please enter your cohort
      </h3>
      <form onSubmit={handleCohortSubmit} className='flex flex-col gap-5'>
        <div>
          <input
            name='cohort_number'
            id='cohort_number'
            className='border block w-full border-warm-tone outline-none dark:bg-dark dark:text-[#e5e5e5] dark:border-blue-300 dark:border-b focus:border-blue-300 focus:border-2 rounded-md py-2 px-3'
            type='number'
            placeholder='cohort number'
            min={8}
            max={40}
            value={cohortNumber}
            onChange={e => setCohortNumber(e.target.value)}
          />
        </div>

        <div className='flex justify-center gap-10'>
          {cohortChange && (
            <Button value='close' handleClick={handleClick} style={style} />
          )}
          <Button
            value='Submit'
            type='submit'
            style='hover:bg-dark-blue hover:text-body border py-1 px-4 dark:text-yellow mt-2 dark:border-cool self-center border-dark'
          />
        </div>
      </form>
    </div>
  );
};

Cohort.propTypes = {
  handleClick: PropTypes.func,
  cohortChange: PropTypes.bool,
  refetch: PropTypes.func
};
export default Cohort;
