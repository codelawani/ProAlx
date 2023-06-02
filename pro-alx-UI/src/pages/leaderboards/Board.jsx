import PropTypes from 'prop-types';

const Board = ({ rank, name, hours, average }) => {
	const getTime = seconds => {
		const hour = Math.floor(seconds / 3600);
		const minute = Math.floor((seconds % 3600) / 60);
		return `${hour}hrs ${minute}mins`;
	};

	return (
		<tr className='grid grid-cols-4 content-center border-b last:border-none py-3 gap-9 '>
			<td className='text-center'>{rank}</td>
			<td className='text-center'>{name}</td>
			<td className='text-center'>{getTime(hours)}</td>
			<td className='text-center'>{getTime(average)}</td>
		</tr>
	);
};

Board.propTypes = {
	rank: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	hours: PropTypes.number.isRequired,
	average: PropTypes.number.isRequired,
};

export default Board;
