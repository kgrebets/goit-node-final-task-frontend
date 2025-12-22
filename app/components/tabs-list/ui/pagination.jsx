import { twMerge } from 'tailwind-merge';
import getPaginationItems from '../../../helpers/getWindowEllipsisPaginationItems.js';

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const items = getPaginationItems(page, totalPages);

  return (
    <ul className="flex justify-center items-center mt-8 md:mt-14 gap-1.5 flex-wrap">
      {items.map((item, idx) => (
        <li key={idx}>
          {item === 'dots' ? (
            <span className="px-3 text-tertiary select-none">…</span>
          ) : (
            <button
              type="button"
              onClick={() => onPageChange(item)}
              className={twMerge(
                'py-2 px-4 border-0 text-sm md:text-base',
                item === page
                  ? 'border border-primary text-primary hover:text-white font-bold'
                  : 'text-tertiary hover:text-white'
              )}
            >
              {item}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;

