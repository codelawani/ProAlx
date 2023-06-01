import PropTypes from 'prop-types';

const Box = ({ name, text, img }) => {
  return (
    <article className='col-span-1 border-2 p-4 rounded-lg'>
      <p className='pb-4'>{text}</p>
      <div className='flex justify-center'>
        <img
          src={img}
          alt='profile picture of reviewer'
          className='rounded-full'
        />
      </div>
      <p className='py-3 text-end italic'>-{name}</p>
    </article>
  );
};

Box.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  img: PropTypes.string
};

export default Box;
