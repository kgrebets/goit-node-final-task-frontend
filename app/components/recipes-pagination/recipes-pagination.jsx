import React, { useCallback } from 'react';
import { fetchRecipes } from '../../redux/slices/recipes/recipesOps.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectRecipesFilters } from '../../redux/slices/recipes/recipesSlice.js';
import { twMerge } from 'tailwind-merge';
import getPaginationItems from '../../helpers/getWindowEllipsisPaginationItems.js';

const RecipesPagination = ({ page, totalPages }) => {
  const savedFilters = useSelector(selectRecipesFilters);
  const dispatch = useDispatch();

  const handlePaginationClick = useCallback(
    (page) => {
      const payload = {
        page,
        ...savedFilters,
      };

      dispatch(fetchRecipes(payload));
    },
    [savedFilters, dispatch]
  );

  const items = getPaginationItems(page, totalPages);

  return (
    <ul className="flex justify-center items-center mt-8 md:mt-14 gap-1.5 flex-wrap">
      {items.map((item, idx) => (
        <li key={idx}>
          {item === 'dots' ? (
            <span className="px-3 text-p select-none">…</span>
          ) : (
            <button
              onClick={() => handlePaginationClick(item)}
              className={twMerge(
                'py-2 px-4 border-0',
                item === page ? 'border border-tertiary' : ''
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

export default RecipesPagination;
