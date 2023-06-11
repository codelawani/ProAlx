// import { reviews } from '../data';
// import Box from '../components/Box';
import { Link } from 'react-router-dom';
// import waka from '../assets/stats.png';
import { proalx } from '../data';
import Item from './Item';

const Main = () => {
	// const review = reviews.map(review => {
	// 	return <Box key={review.id} {...review} />;
	// });
	return (
		<main className='dark:bg-dark dark:text-gray-300 relative z-[0] border dark:border-dark border-body '>
			<section className='flex flex-col justify-center items-center my-10 bg-body dark:bg-dark gap-3 py-6 '>
				{proalx.map(item => (
					<Item key={item.id} {...item} />
				))}
				<Link
					to=''
					className='text-black text-2xl bg-light-blue rounded-lg p-2 cursor-pointer hover:border-light-blue hover:opacity-90 px-3 hover:bg-dark hover:text-white dark:hover:bg-yellow dark:hover:text-dark transform transition ease-out duration-200'
				>
					view our guide
				</Link>
			</section>
		</main>
	);
};

export default Main;
