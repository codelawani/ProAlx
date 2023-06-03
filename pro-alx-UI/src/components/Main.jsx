import { reviews } from '../data';
import Box from '../components/Box';
// contain snapshot of user dashboard as well

const Main = () => {
  const review = reviews.map(review => {
    return <Box key={review.id} {...review} />;
  });
  return (
    <main className='dark:bg-black'>
      <section className='pt-7 lg:px-6 px-4'>
        <h3 className='font-semibold py-4 text-center text-2xl md:py-2'>
          Testimonials
        </h3>
        <p className='pb-4'>
          Hear directly from other students who have used our web app. Their
          success stories speak volumes about the quality of our product.
        </p>
        <div className='grid px-6 lg:grid-cols-3 gap-4 pb-3'>{review}</div>
      </section>
    </main>
  );
};

export default Main;
