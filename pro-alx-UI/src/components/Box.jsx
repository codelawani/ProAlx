import PropTypes from 'prop-types';

const Box = ({ name, text, img }) => {
	return (
		<article className='after:content-[""] relative transition-all duration-200  dark:border-y dark:border-y-pink-800'>
			<p className='pb-4'>{text}</p>
			<div className='flex relative gap-3'>
				<img
					src={img}
					alt='profile picture of reviewer'
					className='rounded-full w-16'
				/>
				<p className='py-3 text-end flex flex-col items-start justify-center'>
					<span className='normal-case'>{name}</span>
					<span className='italic'>cohort 7</span>
				</p>
			</div>
		</article>
	);
};

Box.propTypes = {
	name: PropTypes.string,
	text: PropTypes.string,
	img: PropTypes.string,
};

export default Box;
