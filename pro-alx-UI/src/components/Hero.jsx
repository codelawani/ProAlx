import Button from './Button';
import img from '../assets/casual-3d.png';

const Hero = () => {
  const style =
		'border-2 p-2  text-black border-red-900 w-60 dark:text-gray-300 dark:bg-red-950 lg:text-2xl';

  return (
    <section className='md:h-screen justify-center p-4 flex flex-col md:flex-row lg:px-10 dark:text-gray-300 md:mt-0  bg-no-repeat bg-contain bg-right-bottom items-center bg-[#f9d3d3] md:after:content-[""] relative after:absolute after:-bottom-0   after:h-9 after:rotate-0 dark:bg-blur rounded-full after:w-1/2'>
      <div className='md:basis-3/4 items-center flex flex-col md:items-start bg-transparent md:px-4 basis-0 '>
        <h2 className=' text-black text-3xl md:text-4xl text-center lg:text-5xl font-bold leading-10 tracking-wide pb-4 dark:text-gray-300 md:text-justify lg:text-left'>
          Teamwork Made Easy: Find Active Partners for Smooth Project
          Collaboration
        </h2>
        <p className='pt-3 pb-6 tracking-wide leading-7 text-justify'>
          Discover a dynamic platform where like-minded individuals come
          together, sharing their skills, expertise, and passion for
          collaborative success. Our goal is to help you find active partners
          who align with your project goals, enabling seamless teamwork.
        </p>
        <Button style={style} value='Get Started' />
      </div>
      <div
        className='lg:pt-0 w-full md:h-full bg-[url("../src/assets/casual-3d.png")] bg-center md:basis-6/12 z-10 bg-transparent
       bg-cover bg-no-repeat'
      >
        <img
          src={img}
          alt='faces of alx'
          className=' md:hidden lg:h-56 rounded-lg'
          aria-hidden
        />
      </div>
    </section>
  );
};

export default Hero;
