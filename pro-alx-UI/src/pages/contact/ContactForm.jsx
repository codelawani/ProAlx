import { useForm } from "react-hook-form";
import Button  from "../../components/Button";

const ContactForm = () => {
	const totalCohorts = 17;
	const cohorts = [];

	for (let i = 0; i < totalCohorts; i++) {
		cohorts.push(`cohort ${i + 1}`);
	}

	const options = cohorts.map(cohort => (
		<option key={cohort} value={cohort}>
			{cohort}
		</option>
  ));
  
  const { register, handleSubmit , formState : {errors}} = useForm();
  
  const submitForm = (data) => {
    console.log(data);
  }
	return (
		<form onSubmit={handleSubmit(submitForm)} className="">
			<div className=''>
				<label htmlFor='fullname'>Fullname</label>
				<input
					type='text'
					{...register('fullname', { required: true })}
          aria-invalid={errors.fullname ? 'true' : 'false'}
          className="border block w-full border-main rounded"
        />
      {errors.fullname && <span role="alert" className="text-red">please enter your full name</span>}
			</div>
			<div className=''>
				<label htmlFor='cohort'>Cohort</label>
				<select {...register('cohort')}>
					<option value=''></option>
					{options}
				</select>
			</div>
			<div className=''>
				<label htmlFor='fullname'>Message</label>
				<textarea
					cols='30'
					rows='10'
					{...register('message', { required: true })}
				></textarea>
			</div>
			<Button type='submit' value='send' />
		</form>
	);
};

export default ContactForm;
