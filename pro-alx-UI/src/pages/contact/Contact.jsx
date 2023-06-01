import ContactForm from './ContactForm';
import img from '../../assets/contact.png';

const Contact = () => {
	return (
		<div className='mt-24 p-3 flex flex-col pb-0 md:h-screen'>
			<h2 className='font-semibold'>Contact Us</h2>
			<p className='mb-5'>
				We would love to hear from you. Please use the form below to get in
				touch with our Team.
			</p>

			<div className='flex flex-col md:flex-row md:px-6 md:gap-8 md:items-center md:justify-center'>
				<img
					src={img}
					alt='contact icon'
					aria-hidden={true}
					className='w-3/4 mb-5 md:w-2/4'
				/>
				<ContactForm />
			</div>
		</div>
	);
};

export default Contact;
