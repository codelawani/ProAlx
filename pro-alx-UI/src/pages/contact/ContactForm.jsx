import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
const {
	VITE_SERVICE_ID: SERVICE_ID,
	VITE_TEMPLATE_ID: TEMPLATE_ID,
	VITE_PUBLIC_KEY: PUBLIC_KEY,
} = import.meta.env;

emailjs.init(PUBLIC_KEY);

const ContactForm = () => {
	const totalCohorts = 30;
	const cohorts = Array.from(
		{ length: totalCohorts },
		(_, idx) => `cohort ${8 + idx}`
	);
	const style =
		'border-2 text border-yellow w-1/2 self-center py-2 hover:text-dark hover:bg-yellow transition ease-in-out duration-200 text-xl capitalize active:scale-x-[0.8] mt-4';

	const options = cohorts.map(cohort => (
		<option key={cohort} value={cohort}>
			{cohort}
		</option>
	));

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const submitForm = data => {
		emailjs
			.send(SERVICE_ID, TEMPLATE_ID, data)
			.then(response => {
				console.log('Email sent successfully!', response);
				toast.success('Message sent successfully!');
				reset();
			})
			.catch(error => {
				toast.error('Error sending message.');
				console.error('Error sending email:', error);
			});
	};
	return (
		<form
			onSubmit={handleSubmit(submitForm)}
			className=' w-full px-6 py-[4rem] self-center flex flex-col justify-center md:w-6/12 border rounded-lg bg-gradient-to-br from-purple-400 dark:from-purple-950 via-lime-300 dark:via-dark to-red-400'
		>
			<div className='mb-4'>
				<label htmlFor='from_name' className='text-lg'>
					Fullname
				</label>
				<input
					type='text'
					{...register('from_name', { required: true })}
					aria-invalid={errors.fullname ? 'true' : 'false'}
					className='border-b-2 block w-full border-red-950 outline-none dark:bg-black dark:text-[#e5e5e5] dark:border-blue-300 dark:border-b focus:border-blue-300 focus:border-2 rounded-lg py-2'
					id='from_name'
				/>
				{errors.from_name && (
					<span role='alert' className='text-red-600'>
						please enter your full name
					</span>
				)}
			</div>
			<div className='mb-4'>
				<label htmlFor='from_email' className='text-lg'>
					Email
				</label>
				<input
					type='email'
					{...register('from_email', {
						required: true,
						pattern: {
							value:
								/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
						},
					})}
					aria-invalid={errors.from_email ? 'true' : 'false'}
					className='border-b-2 block w-full border-red-950 outline-none dark:bg-black dark:text-[#e5e5e5] dark:border-blue-300 dark:border-b focus:border-blue-300 rounded-lg py-2 focus:border-2'
					id='from_email'
				/>
				{errors.from_email && (
					<span role='alert' className='text-red-600'>
						please enter a valid email
					</span>
				)}
			</div>
			<div className='mb-4'>
				<label htmlFor='cohort'>Cohort</label>
				<select
					{...register('cohort')}
					className='border-b-2 block w-full border-red-950 outline-none dark:bg-black dark:text-[#e5e5e5] dark:border-blue-300 dark:border-b focus:border-blue-300 focus:border-2 rounded-lg py-2'
					id='cohort'
				>
					<option value='' />
					{options}
				</select>
			</div>
			<div className='mb-4'>
				<label htmlFor='message'>Message</label>
				<textarea
					cols='30'
					rows='5'
					{...register('message', { required: true })}
					className='border-b-2 block w-full border-red-950 outline-none focus:border-blue-300 dark:bg-black dark:text-[#e5e5e5] dark:border-blue-300 dark:border-b focus:border-2 rounded-lg'
					name='message'
				/>
				{errors.message && (
					<span role='alert' className='text-red-600'>
						please enter your feedback
					</span>
				)}
			</div>
			<Button type='submit' value='send' style={style} />
		</form>
	);
};

export default ContactForm;
