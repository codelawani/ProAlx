import { useEffect, useState, useMemo } from 'react';
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

    // change current page to the first page when it is filtered
    // reset to beginning when data changes
    useEffect(() => {
      setCurrentPage(1);
    }, [data]);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const items = data ? data?.slice(firstIndex, lastIndex) : []; // current page data
    const totalPages = data ? Math.ceil(data?.length / itemsPerPage) : 0;

    // minimum number of pages to be shown on each side of the current page
    const siblingCount = 1;

    // calculate page numbers to show
    const pagesRange = useMemo(() => {
      // number of pages shown
      const totalNumbers = siblingCount + 5;
      const DOTS = '...';

      // if number of pages to be shown is less than the total number of pages available then show all page numbers.
      if (totalNumbers >= totalPages) return range(1, totalPages);

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPages
      );

      // only show dots when there is more than one page number to be inserted between the siblings index
      const showLeftDots = leftSiblingIndex > 2;
      const showRightDots = rightSiblingIndex < totalPages;

      // when there's no left dots to show but right dots
      if (!showLeftDots && showRightDots) {
        const leftItem = 5 * siblingCount;
        const leftRange = range(1, leftItem);

        return [...leftRange, DOTS, totalPages];
      }

      // when there's no right dots to show but left dots
      if (showLeftDots && !showRightDots) {
        const rightItem = 5 * siblingCount;
        const rightRange = range(totalPages - rightItem + 1, totalPages);

        return [1, DOTS, ...rightRange];
      }

      // when there's left and right dots to show
      if (showLeftDots && showRightDots) {
        const middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [1, DOTS, ...middleRange, DOTS, totalPages];
      }
    }, [currentPage, totalPages]);

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
              value='Prev'
              handleClick={getPrevPage}
              style={style}
              disabled={currentPage === 1}
            />
            <nav>
              <ul className='flex gap-3'>
                {pagesRange.map(page => {
								  if (page === '...') {
								    return <li key={Math.random()}>&#8230;</li>;
								  }
								  return (
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
								  );
                })}
              </ul>
            </nav>
            <Button
              value='Next'
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
    data: PropTypes.array
  };
  return PaginatedComponent;
};

export default withPagination;

/**
 * range - creates an array of certain length and set the elements from start to end value
 * @param {integer} start - beginning of array
 * @param {integer} end - last value of array
 * @returns {array} an array
 */
const range = (start, end) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, index) => index + start);
};
