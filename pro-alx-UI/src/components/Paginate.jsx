import { useState } from 'react';
//import PropTypes from 'prop-types';
import Button from './Button';

const withPagination = (Component, data, itemsPerPage) => {
	return function Paginate(props) {
		const [currentPage, setCurrentPage] = useState(1);
		const lastIndex = currentPage * itemsPerPage;
		const firstIndex = lastIndex - itemsPerPage;
		const items = data.slice(firstIndex, lastIndex);
		const totalPages = Math.ceil(data.length / itemsPerPage);
		const pagesList = [...Array(totalPages + 1).keys()].slice(1);

		const style = `disabled:cursor-not-allowed disabled:text-gray-300 text-blue-400 border p-2 disabled:border-gray-300 border-blue-400 hover:bg-blue-500 hover:text-white disabled:hover:bg-inherit`;

		const getNextPage = () => {
			if (currentPage !== lastIndex) {
				setCurrentPage(prev => prev + 1);
			}
		};
		const getPrevPage = () => {
			if (currentPage !== firstIndex) {
				setCurrentPage(prev => prev - 1);
			}
		};

		const changeCurrent = id => {
			setCurrentPage(id);
		};
		return (
			<div>
				<Component data={items} {...props} />
				<div className='flex justify-between text-blue-500 dark:text-blue-300 w-full items-center mt-6'>
					<Button
						value='PrevPage'
						handleClick={getPrevPage}
						style={style}
						disabled={currentPage !== 1 ? false : true}
					/>
					<nav>
						<ul className='flex gap-3'>
							{pagesList.map(page => (
								<li
									key={page}
									onClick={() => {
										changeCurrent(page);
									}}
									className={` ${
										page === currentPage ? 'text-blue-400' : 'text-gray-300'
									} cursor-pointer`}
								>
									{page}
								</li>
							))}
						</ul>
					</nav>
					<Button
						value='NextPage'
						handleClick={getNextPage}
						style={style}
						disabled={currentPage <= totalPages - 1 ? false : true}
					/>
				</div>
			</div>
		);
	};
};

// withPagination.propTypes = {
// 	itemsPerPage: PropTypes.number,
// 	data: PropTypes.array,
// };

export default withPagination;
