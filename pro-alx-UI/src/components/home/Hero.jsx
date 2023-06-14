import Button from '../Button';
import { handleAuth } from '../../utils/githubOauth';
import { useUser } from '../../hooks/customContexts';

const Hero = () => {
	const { updateLoading } = useUser();

	const style =
		'border-2 p-2 text-black border-yellow w-60 dark:text-dark dark: lg:text-2xl bg-yellow hover:text-dark dark:hover:text-dark hover:border-body ';

	return (
		<section className='md:h-screen justify-center flex flex-col md:flex-row lg:px-10 pt-5 items-center z-[10] relative bg-cool dark:bg-none dark:bg-dark-hero pb-[5rem] px-3'>
			<div className='md:basis-3/4 items-center flex flex-col md:items-start md:px-4 basis-0 rounded-full relative'>
				<h2 className=' text-white text-3xl md:text-4xl text-center lg:text-5xl font-bold leading-10 tracking-widest pb-4 dark:text-yellow md:text-justify lg:text-left uppercase'>
					Teamwork Made Easy: Find Active Partners for Smooth Project
					Collaboration
				</h2>
				<p className='pt-3 pb-6 tracking-wide leading-7 text-justify font-poppins'>
					Discover a dynamic platform where like-minded individuals come
					together, sharing their skills, expertise, and passion for
					collaborative success. Our goal is to help you find active partners
					who align with your project goals, enabling seamless teamwork.
				</p>
				<Button
					style={style}
					value='Get Started'
					handleClick={() => handleAuth(updateLoading)}
				/>
			</div>
			<div
				className='lg:pt-0 w-full md:h-full md:bg-[url("../src/assets/casual-3d.png")] bg-center md:basis-6/12 z-10 bg-transparent
       bg-cover bg-no-repeat'
			/>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 1440 320'
				className='absolute bottom-0 z-[-1]  dark:fill-inherit fill-body'
			>
				<path
					fill=''
					fillOpacity='1'
					d='M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
				/>
			</svg>
		</section>
	);
};

export default Hero;
