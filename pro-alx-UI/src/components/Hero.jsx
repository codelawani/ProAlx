import Button from './Button';
import img from '../assets/two.jpeg';

const Hero = () => {
  const style =
		'border-2 p-2  text-black border-red-900 w-60 dark:text-gray-300';
  return (
    <section className='md:h-screen justify-center md:content-center mt-16 p-4 md:grid grid-cols-3 lg:px-10 dark:text-gray-300'>
      <div className='md:col-span-2 items-center flex flex-col md:block'>
        <h2 className=' text-black text-3xl text-left  md:text-5xl font-bold leading-10 tracking-wide pb-4 dark:text-gray-300'>
          Teamwork Made Easy: Find Active Partners for Smooth Project
          Collaboration
        </h2>
        <p className='pt-3 pb-6 tracking-wide leading-7'>
          Discover a dynamic platform where like-minded individuals come
          together, sharing their skills, expertise, and passion for
          collaborative success. Our goal is to help you find active partners
          who align with your project goals, enabling seamless teamwork.
        </p>
        <Button style={style} value='Get Started' />
      </div>
      <div className='  lg:justify-self-end md:col-span-1 pt-9 lg:pt-0'>
        <img src={img} alt='faces of alx' className=' md:max-w-xs lg:h-56' />
      </div>
    </section>
  );
};

export default Hero;
