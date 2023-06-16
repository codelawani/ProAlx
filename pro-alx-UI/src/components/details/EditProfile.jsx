import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import { useCustomMutation } from '../../hooks/useCustomQuery';
import PropTypes from 'prop-types';

const EditProfile = ({ handleClick = () => {}, user, refetch }) => {
  const style = 'border p-2 bg-yellow px-3 hover:bg-main dark:text-black';

  // use react-hook-form to handle form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: user?.name,
      timezone: user?.timezone,
      whatsapp: user?.whatsapp,
      email: user?.email
    }
  });

  const { mutateAsync } = useCustomMutation({
    endpoint: '/user',
    method: 'put'
  });
  const onSubmit = async userData => {
    try {
      const res = await mutateAsync(userData);
      if (res.status === 200) {
        toast('profile updated successfully!');
        refetch();
        handleClick();
      } else {
        toast.error('Failed to update profile, please try again');
      }
    } catch (err) {
      toast.error('Failed to update profile, please try again');
    }
  };

  const error = 'border border-red-500';
  const fieldStyle =
		'flex flex-col md:flex-row gap-2 md:items-center py-2 relative';

  return (
    <div className=' fixed transform left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4/5 md:w-fit z-[20] bg-bar-dark rounded-xl p-[2rem] dark:bg-bar md:text-base'>
      <h3 className='w-fit py-4 border-b border-blur mb-2'>Update Profile</h3>
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        <div className={fieldStyle}>
          <label htmlFor='name'>*Name</label>
          <div className='flex flex-col'>
            <input
              {...register('name', { required: true })}
              type='text'
              className={`dark:bg-blur rounded-md p-2 w-full outline-none focus:border-2 focus:border-blue-500 ${
								errors.name ? error : ''
							}`}
              id='name'
            />
            {errors.name && (
              <span className='text-xs text-red-700  pt-1'>
                Name cannot be empty
              </span>
            )}
          </div>
        </div>
        <div className={fieldStyle}>
          <label htmlFor='email'>*Email</label>
          <div className='flex flex-col'>
            <input
              {...register('email', {
							  required: true,
							  pattern: {
							    value:
										/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
							  }
              })}
              type='email'
              className={`dark:bg-blur rounded-md p-2 w-full outline-none focus:border-2 focus:border-blue-500 ${
								errors.email ? error : ''
							}`}
              placeholder='Enter your email'
              id='email'
            />
            {errors.email && (
              <span className='text-xs text-red-700 pt-1'>
                Enter a valid email address
              </span>
            )}
          </div>
        </div>
        <div className={fieldStyle}>
          <label htmlFor='timezone'>Country</label>
          <input
            {...register('timezone')}
            type='text'
            className='dark:bg-blur rounded-md p-2 w-full outline-none focus:border-2 focus:border-blue-500'
            id='timezone'
          />
        </div>
        <div className={fieldStyle}>
          <label htmlFor='whatsapp'>Whatsapp</label>
          <div className='flex flex-col'>
            <input
              {...register('whatsapp', {
							  pattern: /^\+[1-9]{1}[0-9]{3,14}$/
              })}
              type='text'
              className={`dark:bg-blur rounded-md p-2 w-full outline-none focus:border-2 focus:border-blue-500 ${
								errors.whatsapp ? error : ''
							}`}
              placeholder='+ whatsapp number'
              id='whatsapp'
            />
            {errors.whatsapp && (
              <span className='text-xs text-red-700 pt-1'>
                use country code format
              </span>
            )}
          </div>
          <p className='dark:text-red-700 text-amber-500 text-xs'>
            *U may not be contacted if invalid details are provided
          </p>
          <p className='text-xs text-amber-500 dark:text-red-700'>
            Fields marked with * are required
          </p>
        </div>
        <div className='flex items-center justify-between py-3 pt-7'>
          <Button value='Close' handleClick={handleClick} style={style} />
          <Button value='Submit' type='submit' style={style} />
        </div>
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  handleClick: PropTypes.func,
  user: PropTypes.object,
  refetch: PropTypes.func
};

export default EditProfile;
