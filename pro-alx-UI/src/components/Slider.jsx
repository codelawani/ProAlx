import PropTypes from 'prop-types';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { useMemo, useState } from 'react';
import Button from './Button';

const Slider = ({ items }) => {
	const [current, setCurrent] = useState(0);

	const currentItem = useMemo(() => items[current], [current, items]);
	const size = items.length - 1;

	const nextItem = () => {
		if (current >= size) return;
		setCurrent(prev => prev + 1);
	};

	const prevItem = () => {
		if (current <= 0) return;
		setCurrent(prev => prev - 1);
	};

	return (
		<div className='flex flex-col'>
			<h2>{currentItem?.name}</h2>
			<p>{currentItem?.text}</p>

			<div className='flex justify-between'>
				<Button handleClick={prevItem} value={<FiChevronLeft />} />
				<Button handleClick={nextItem} value={<FiChevronRight />} />
			</div>
		</div>
	);
};

Slider.propTypes = {
	items: PropTypes.array,
};

export default Slider;
