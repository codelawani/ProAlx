import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import api from '../../hooks/api';
import PropTypes from 'prop-types';

const EditProfile = ({ setEditProfile, refetch }) => {
  const totalCohorts = 17;
  const cohorts = Array.from(
    { length: totalCohorts },
    (_, idx) => `cohort ${idx + 1}`
  );
  const style = 'border p-2';
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async userData => {
    const data = {
      name: userData?.fullname,
      cohort_number: userData?.cohort
    };

    try {
      const res = await api.put(
        '/users/7be332d6-2a14-4c40-a753-e6736c8673d3',
        data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (res.status === 200) {
        toast('Profile updated successfully!');
        setEditProfile(false);
        reset();
        refetch();
      } else {
        toast.error('An error occurred');
      }
    } catch (err) {
      toast.error('An error occurred');
    }
  };

  const handleClose = () => {
    setEditProfile(false);
  };

  const options = cohorts.map(cohort => (
    <option key={cohort} value={cohort}>
      {cohort}
    </option>
  ));
  return (
    <>
      <div
        className='bg-blur opacity-25 fixed z-[10] inset-0 h-screen'
        onClick={handleClose}
      />
      <div className='fixed transform left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-fit z-[20] bg-body rounded-xl p-[2rem]'>
        <h3 className='w-fit py-2 border-b border-blur'>Update Profile</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label htmlFor='fullname' className='text-lg'>
              Fullname
            </label>
            <input
              type='text'
              {...register('fullname', { maxLength: 50 })}
              className='border block w-full border-blur outline-none dark:bg-black dark:text-[#e5e5e5] dark:border-blue-300 dark:border-b focus:border-blue-300 focus:border-2 rounded-lg py-2 px-2'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='cohort'>Cohort</label>
            <select
              {...register('cohort')}
              className='border block w-full border-blur outline-none dark:bg-dark dark:text-[#e5e5e5] dark:border-blue-300 dark:border-b focus:border-blue-300 focus:border-2 rounded py-2'
              name='cohort'
            >
              <option value='' />
              {options}
            </select>
          </div>
          <div className='flex items-center justify-between'>
            <Button value='Close' handleClick={handleClose} style={style} />
            <Button value='Submit' type='submit' style={style} />
          </div>
        </form>
      </div>
    </>
  );
};

EditProfile.propTypes = {
  setEditProfile: PropTypes.func,
  refetch: PropTypes.func
};

export default EditProfile;
