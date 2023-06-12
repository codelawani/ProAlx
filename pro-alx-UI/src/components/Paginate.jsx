import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * withPagination - A higher-order component that adds pagination functionality to a wrapped component.
 *
 * @params {Function} Component - component that needs pagination
 * @params {integer} itemsPerPage - number of items displayed per page
 * @returns {Function} - The wrapped component with pagination added
 */

const withPagination = (Component, itemsPerPage) => {
	const PaginatedComponent = props => {
		const { data, ...others } = props;
		const [currentPage, setCurrentPage] = useState(1);
		const lastIndex = currentPage * itemsPerPage;
		const firstIndex = lastIndex - itemsPerPage;
		const items = data ? data?.slice(firstIndex, lastIndex) : []; // current page data
		const totalPages = data ? Math.ceil(data?.length / itemsPerPage) : 0;
		const pagesList = [...Array(totalPages + 1).keys()].slice(1);

		const style =
			'disabled:cursor-not-allowed disabled:text-gray-600 text-blue-400 border p-2 disabled:border-gray-300 border-blue-400 hover:bg-blue-500 hover:text-white disabled:hover:bg-inherit';

		// switch to next page
		const getNextPage = () => {
			if (currentPage !== lastIndex) {
				setCurrentPage(prev => prev + 1);
			}
		};

		// switch to previous page
		const getPrevPage = () => {
			if (currentPage !== firstIndex) {
				setCurrentPage(prev => prev - 1);
			}
		};

		// switch current page depending on page id/number
		const changeCurrent = id => {
			setCurrentPage(id);
		};
		return (
			<div>
				<Component data={items} {...others} />
				{totalPages > 1 && (
					<div className='flex justify-between text-blue-500 dark:text-blue-300 w-full items-center my-6'>
						<Button
							value='PrevPage'
							handleClick={getPrevPage}
							style={style}
							disabled={currentPage === 1}
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
											page === currentPage
												? 'text-blue-400'
												: 'dark:text-main text-dark'
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
							disabled={!(currentPage <= totalPages - 1)}
						/>
					</div>
				)}
			</div>
		);
	};
	PaginatedComponent.propTypes = {
		data: PropTypes.array,
	};
	return PaginatedComponent;
};

export default withPagination;
