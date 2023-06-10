import PropTypes from 'prop-types';

const Item = ({ text, img, alt }) => {
  return (
    <div className='flex flex-col  md:flex-row even:md:flex-row-reverse even: items-center gap-5 py-10 px-40 after:content-[""] even:relative even:after:absolute even:after:bg-warm even:after:inset-0 after:z-[-1] even:after:transform even:after:skew-y-[-3deg] even:dark:after:bg-none even:dark:after:bg-dark-hero even:z-10'>
      <p className='md:w-2/4'>{text}</p>
      <img src={img} alt={alt} className='md:w-2/4' />
    </div>
  );
};
Item.propTypes = {
  text: PropTypes.string,
  img: PropTypes.string,
  alt: PropTypes.string
};

export default Item;
