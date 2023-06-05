import { useState } from 'react';
//import PropTypes from 'prop-types';
import Button from './Button';
import { useUserData } from '../hooks/fetchData';

/**
 * This is a higher-order function that adds pagination functionality to a component.
 * Usage:
 * To use this higher order component, wrap your component like this:
 *  const PaginatedComponent = withPagination(Component,<queryKey>, <endpoint>, <itemsPerPge>)
 * @params
 * Component - component that needs pagination(React component)
 * queryKey - unique key to identify data fetched(array) i.e ['user']
 * endpoint - route where data is fetched(string)
 * itemsPerPage - number of items displayed per page (number)
 */

const withPagination = (Component, queryKey, endpoint, itemsPerPage) => {
	const PaginatedComponent = props => {
		const { value: data } = useUserData({
			queryKey: queryKey,
			endpoint: endpoint,
			keepPreviousData: true,
		});
		const [currentPage, setCurrentPage] = useState(1);
		const lastIndex = currentPage * itemsPerPage;
		const firstIndex = lastIndex - itemsPerPage;
		const items = data ? data?.slice(firstIndex, lastIndex) : [];
		const totalPages = data ? Math.ceil(data?.length / itemsPerPage) : 0;
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
	return PaginatedComponent;
};

export default withPagination;
