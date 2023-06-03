import ContactForm from './ContactForm';
import img from '../../assets/contact.png';

const Contact = () => {
  return (
    <div className='mt-20 p-3 flex flex-col pb-7 dark:bg-black dark:text-gray-300'>
      <h2 className='pb-3 text-2xl bg-clip-text text-transparent bg-gradient-to-tr from-red-300 to-purple-950 font-bold'>
        Contact Us
      </h2>
      <p className='mb-5'>
        We would love to hear from you. Please use the form below to get in
        touch with our Team.
      </p>

      <div className='flex flex-col md:flex-row md:px-6 md:gap-8 md:items-center md:justify-center'>
        <img
          src={img}
          alt='contact icon'
          aria-hidden
          className='w-3/4 mb-8 self-center md:w-2/4'
        />
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
