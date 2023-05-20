import PropTypes from 'prop-types';

const Button = ({ type = 'button', handleClick = null, value }) => {
	return (
		<button
			type={type}
			onClick={handleClick}
			style={{ backgroundColor: 'inherit', border:"1px solid orange", borderRadius: "8px", padding: "0.5rem" }}
		>
			{value}
		</button>
	);
};

export default Button;

Button.propTypes = {
	type: PropTypes.string,
	handleClick: PropTypes.func,
	value: PropTypes.string.isRequired,
};
