import PropTypes from 'prop-types';

const Button = ({ type = 'button', handleClick = null, value, style=null }) => {
	
	const styles = {
		backgroundColor: '#ff8906',
		color: '#fffffe',
		border: '1px solid #fffffe',
		borderRadius: '8px',
		padding: '0.5rem',
	};
	return (
		<button
			type={type}
			onClick={handleClick}
			style={style?{...styles, ...style}: styles}
		>
			{value}
		</button>
	);
};

export default Button;

Button.propTypes = {
	type: PropTypes.string,
	handleClick: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
	style : PropTypes.object
};
