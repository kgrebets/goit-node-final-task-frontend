import React from 'react';
import RecipeCard from '../recipe-card';
import RecipesPagination from '../recipes-pagination';

const RecipeListing = (recipes) => {
  const { results = [] } = recipes;

  return (
    <div className="lg:col-span-9">
      {results.length ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-5 md:gap-y-10">
          {results.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard {...recipe} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="border rounded-7.5 p-5">
          No Receipts were found matching your filter selection.
        </div>
      )}

      <RecipesPagination {...recipes} />
    </div>
  );
};

export default RecipeListing;
