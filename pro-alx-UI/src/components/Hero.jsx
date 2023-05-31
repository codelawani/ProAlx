import Button from './Button';
import img from "../assets/two.jpeg";

const Hero = () => {
	const style = 'border-2 p-2  text-black border-red-900 w-60';
	return (
		<section className='md:h-screen justify-center md:content-center mt-16 p-4 md:grid grid-cols-3 lg:px-10'>
			<div className='md:col-span-2 items-center flex flex-col md:block'>
				<h2
					className=' text-black text-2xl
					text-center md:text-left  md:text-5xl font-bold leading-10 tracking-wide pb-4'
				>
					Teamwork Made Easy: Find Active Partners for Smooth Project
					Collaboration
				</h2>
				<p className='pt-3 pb-6'>
					Discover a dynamic platform where like-minded individuals and talented
					professionals come together, sharing their skills, expertise, and
					passion for collaborative success, helping you find active partners
					who align with your project goals, enabling seamless teamwork,
					fostering innovation, and unlocking the full potential of your
					projects for remarkable achievements
				</p>
				<Button style={style} value={'Get Started'} />
			</div>
			<div className='  lg:justify-self-end md:col-span-1 pt-9 lg:pt-0'>
				<img src={img} alt='faces of alx' className=' md:max-w-xs lg:h-56' />
			</div>
		</section>
	);
};

export default Hero;

/*

[linear-gradient(to_right_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.2)),url('./assets/two.jpeg')]*/
