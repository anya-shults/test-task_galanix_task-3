import React, { memo, useMemo } from 'react';
import './Pagination.css';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { createPaginationList } from '../../utils/createPagination';
import { getSearchWith } from '../../utils/getSearchWith';

type Props = {
  totalPages: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = memo(({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const [searchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    onPageChange(page);
  };

  const pages = useMemo(() => createPaginationList(currentPage, totalPages),
    [currentPage, totalPages]
  );

  return (
    <ul className="pagination">
      {pages.map((pageInfo, index) => (
        <li
          className={cn('pagination__item', {
            'pagination__item--active': pageInfo.current,
          })}
          key={index}
        >
          {pageInfo.page === '...' ? (
            <span
              className='pagination__non-link'
            >
              {pageInfo.page}
            </span>
          ) : (
            <Link
              className={cn('pagination__link', {
                'pagination__link--active': pageInfo.current,
              })}
              to={{
                search: getSearchWith(
                  searchParams,
                  {
                    page: pageInfo.page === '1'
                      ? null
                      : pageInfo.page
                  }
                )
              }}
              onClick={() => handlePageChange(+pageInfo.page)}
            >
              {pageInfo.page}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
});