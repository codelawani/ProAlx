import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import api from '../../hooks/api';
import PropTypes from 'prop-types';
import { useUser } from '../../hooks/customContexts';

const EditProfile = ({ handleClick }) => {
  const { user } = useUser();
  const style = 'border p-2';
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user.name
    }
  });
  const onSubmit = async userData => {
    try {
      const res = await api.put(
        '/users/7be332d6-2a14-4c40-a753-e6736c8673d3',
        userData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (res.status === 200) {
        toast('Profile updated successfully!');
        handleClick();
        reset();
      } else {
        toast.error('An error occurred');
      }
    } catch (err) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className=' transform  bg-body rounded-xl p-[2rem] w-full'>
      <h3 className='w-fit py-2 border-b border-blur'>Update Profile</h3>
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        <div>
          <label htmlFor='name'>Name</label>
          <input {...register('name')} type='text' />
        </div>
        <div className='flex items-center justify-between'>
          <Button value='Close' handleClick={handleClick} style={style} />
          <Button value='Submit' type='submit' style={style} />
        </div>
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  handleClick: PropTypes.func
};

export default EditProfile;
