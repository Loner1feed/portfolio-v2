import React from 'react';
import { DOTS, usePagination } from 'utils/hooks/use-pagination';

// styles
import './pagination.style.scss';
import { ChevronLeft, ChevronRight } from 'components/icons';

interface PaginationProps {
  onPageChange: (pageNumber: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize?: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize = 4,
  className = '',
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrev = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={'pagination ' + className}>
      {/* Left navigation arrow */}
      <li
        className={
          currentPage === 1
            ? 'pagination__arrow pagination__arrow--prev pagination__arrow--disabled'
            : 'pagination__arrow pagination__arrow--prev'
        }
        onClick={onPrev}
      >
        <ChevronLeft />
      </li>
      {paginationRange.map(pageNumber => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination__item dots">&#8230;</li>;
        }

        // Render our Page Pills
        return (
          <li
            className={
              pageNumber === currentPage
                ? 'pagination__item pagination__item--active'
                : 'pagination__item'
            }
            onClick={() => onPageChange(Number(pageNumber))}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={
          currentPage === lastPage
            ? 'pagination__arrow pagination__arrow--next pagination__arrow--disabled'
            : 'pagination__arrow pagination__arrow--next'
        }
        onClick={onNext}
      >
        <ChevronRight />
      </li>
    </ul>
  );
};
