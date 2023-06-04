import PropTypes from 'prop-types';

const Button = ({
	type = 'button',
	handleClick = null,
	value,
	style = '',
	...others
}) => {
	return (
		<button
			type={type}
			onClick={handleClick}
			className={`rounded-md ${style}`}
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
