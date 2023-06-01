import { useForm } from 'react-hook-form';
import Button from '../../components/Button';

const ContactForm = () => {
  const totalCohorts = 17;
  const cohorts = [];
  const style = 'border border-main w-1/2 self-center ';

  for (let i = 0; i < totalCohorts; i++) {
    cohorts.push(`cohort ${i + 1}`);
  }

  const options = cohorts.map(cohort => (
    <option key={cohort} value={cohort}>
      {cohort}
    </option>
  ));

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitForm = data => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className='w-full px-6 py-3 self-center flex flex-col justify-center md:w-2/4 border rounded'
    >
      <div className='mb-4'>
        <label htmlFor='fullname'>Fullname</label>
        <input
          type='text'
          {...register('fullname', { required: true })}
          aria-invalid={errors.fullname ? 'true' : 'false'}
          className='border block w-full border-dark outline-none focus:border-blue-300 rounded'
        />
        {errors.fullname && (
          <span role='alert' className='text-red-500'>
            please enter your full name
          </span>
        )}
      </div>
      <div className='mb-4'>
        <label htmlFor='cohort'>Cohort</label>
        <select
          {...register('cohort')}
          className='border block w-full border-dark outline-none focus:border-blue-300 rounded'
        >
          <option value='' />
          {options}
        </select>
      </div>
      <div className='mb-4'>
        <label htmlFor='fullname'>Message</label>
        <textarea
          cols='30'
          rows='5'
          {...register('message', { required: true })}
          className='border block w-full border-dark outline-none focus:border-blue-300 rounded'
        />
      </div>
      <Button type='submit' value='send' style={style} />
    </form>
  );
};

export default ContactForm;
