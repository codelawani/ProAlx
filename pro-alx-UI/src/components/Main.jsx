import { reviews } from '../data';
import Box from '../components/Box';
import { Link } from 'react-router-dom';
import waka from '../assets/stats.png';

const Main = () => {
	const review = reviews.map(review => {
		return <Box key={review.id} {...review} />;
	});
	return (
		<main className='dark:bg-dark dark:text-gray-300 relative z-[0]'>
			<section className='flex flex-col justify-center items-center my-10 bg-body dark:bg-dark gap-3 px-[4rem] py-6'>
				<div className='flex flex-col  md:flex-row items-center gap-3'>
					<p className='w-2/4'>
						We harness the power of Wakatime to provide you with comprehensive
						insights into the remarkable level of activity exhibited by your
						prospective partner. By seamlessly integrating their Wakatime
						statistics, we offer you an unparalleled opportunity to delve into
						the depths of their coding prowess and work ethic. Experience the
						power of Wakatime integration today and pave the way for a fruitful
						partnership founded on a profound understanding of your potential
						partner&#39;s coding prowess and dedication.
					</p>
					<img src='' alt='screenshot of dashboard' className='w-2/4' />
				</div>
				<div className='flex flex-col  md:flex-row-reverse items-center gap-3'>
					<p className='w-2/4'>
						Integrating Wakatime into your preferred code editor is easy. Just
						follow our clear guidelines designed for popular editors to unlock
						the full potential of Wakatime&#39;s features. Experience enhanced
						productivity, transparency, and embark on a journey of mutual growth
						and shared coding aspirations.
					</p>
					<img
						src={waka}
						alt='wakatime dashboard screenshot'
						className='md:w-2/4'
					/>
				</div>
				<Link
					to={''}
					className='text-black text-2xl bg-[#6B7FFF] rounded-lg p-2 cursor-pointer dark:hover:bg-white hover:border-[#6B7FFF] hover:opacity-90 px-3 hover:scale-x-[1.1] hover:bg-dark hover:text-white dark:hover:text-dark'
				>
					view our guideline
				</Link>
			</section>
			<section className='relative pt-7 lg:px-6 px-4 md:h-screen md:flex md:flex-col md:items-center md:justify-center after:content-[""] after:absolute after:bg-warm after:inset-0 after:z-[-1] after:transform after:skew-y-[-7deg] dark:after:bg-none dark:after:bg-dark-hero'>
				<div className=''>
					<h3 className='font-semibold py-4 text-center text-2xl md:pb-6 '>
						Testimonials
					</h3>
					<p className='pb-4'>
						Hear directly from other students who have used our web app. Their
						success stories speak volumes about the quality of our product.
					</p>
					<div className='flex flex-col md:flex-row px-6 gap-4 pb-3 md:w-full lg:gap-8 items-center justify-center'>
						{review}
					</div>
				</div>
			</section>
		</main>
	);
};

export default Main;
