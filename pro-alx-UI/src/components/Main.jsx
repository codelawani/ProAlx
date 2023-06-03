import { reviews } from '../data';
import Box from '../components/Box';
// contain snapshot of user dashboard as well

const Main = () => {
  const review = reviews.map(review => {
    return <Box key={review.id} {...review} />;
  });
  return (
    <main className='dark:bg-black dark:text-gray-300 relative'>
      <section className='pt-7 lg:px-6 px-4 md:h-screen bg-[#f2fdff] dark:bg-blur'>
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
