import PropTypes from 'prop-types';

const Button = ({
	type = 'button',
	handleClick = () => {},
	value,
	style = '',
	...others
}) => {
	return (
		<button
			type={type}
			onClick={handleClick}
			className={`rounded-md active:outline-none transform active:scale-x-[0.8] hover:scale-x-[1.05] hover:opacity-80 transition ease-in-out ${style}`}
			{...others}
		>
			{value}
		</button>
	);
};

Button.propTypes = {
	type: PropTypes.string,
	handleClick: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
	style: PropTypes.string,
};

export default Button;
