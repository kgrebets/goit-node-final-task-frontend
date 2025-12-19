import React, { useEffect } from 'react';
import Categories from '../../components/categories';
import { useDispatch, useSelector } from 'react-redux';
import { selectRecipes } from '../../redux/slices/recipes/recipesSlice.js';
import RecipeListing from '../../components/recipe-listing/index.js';
import { selectSelectedCategory } from '../../redux/slices/categories/categoriesSlice.js';
import RecipeFilters from '../../components/recipe-filters/index.js';
import BackToCategories from '../../components/categories/back-to-categories';
import { fetchRecipes } from '../../redux/slices/recipes/recipesOps.js';

const Home = () => {
  const recipes = useSelector(selectRecipes);
  const selectedCategory = useSelector(selectSelectedCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCategory) {
      dispatch(
        fetchRecipes({
          categoryid: selectedCategory.id,
        })
      );
    }
  }, [selectedCategory]);

  return (
    <>
      <section className="container mb-16">
        {selectedCategory ? <BackToCategories /> : null}
        <h2 className="text-2.75xl my-4 md:my-5">
          {selectedCategory?.name ?? 'Categories'}
        </h2>
        <p className="text-secondary max-w-133.75 tracking-tight mb-8 md:mb-10">
          {selectedCategory?.description ??
            'Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.'}
        </p>
        {selectedCategory ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
              <RecipeFilters />
              <RecipeListing {...recipes} />
            </div>
          </>
        ) : (
          <Categories />
        )}
      </section>
    </>
  );
};

export default Home;
