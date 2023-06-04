import { reviews } from '../data';
import Box from '../components/Box';
import { Link } from 'react-router-dom';
import waka from '../assets/stats.png';

const Main = () => {
	const review = reviews.map(review => {
		return <Box key={review.id} {...review} />;
	});
	return (
		<main className='dark:bg-black dark:text-gray-300 relative'>
			<section
				className='flex flex-col justify-center items-center my-10 bg-[#a7a9be] dark:bg-[#1d1e28] gap-3 px-4 py-6'
				id='wakatime'
			>
				<div>
					<p className=''>
						We harness the power of Wakatime to provide you with comprehensive
						insights into the remarkable level of activity exhibited by your
						prospective partner. By seamlessly integrating their Wakatime
						statistics, we offer you an unparalleled opportunity to delve into
						the depths of their coding prowess and work ethic. Experience the
						power of Wakatime integration today and pave the way for a fruitful
						partnership founded on a profound understanding of your potential
						partner&#39;s coding prowess and dedication.
					</p>
					<p>
						Integrating Wakatime into your preferred code editor is easy. Just
						follow our clear guidelines designed for popular editors to unlock
						the full potential of Wakatime&#39;s features. Experience enhanced
						productivity, transparency, and embark on a journey of mutual growth
						and shared coding aspirations.
						<Link to={''} className='text-blue-300 text-2xl'>
							view our guideline
						</Link>
					</p>
				</div>
				<div className='flex flex-col items-center '>
					<img src={waka} alt='wakatime dashboard' className='md:w-2/4' />
				</div>
			</section>
			<section className='pt-7 lg:px-6 px-4 md:h-screen bg-[#f2fdff] dark:bg-blur md:flex md:flex-col md:items-center md:justify-center'>
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
			</section>
		</main>
	);
};

export default Main;
