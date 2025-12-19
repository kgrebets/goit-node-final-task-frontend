import React, { useEffect } from 'react';
import CategoryCard from '../category-card';
import {
  selectCategories,
  selectCategory,
} from '../../redux/slices/categories/categoriesSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categories/categoriesOps.js';
import { fetchRecipes } from '../../redux/slices/recipes/recipesOps.js';

const categoryClasses =
  'col-span-1 md:[&:nth-child(3)]:col-span-2 md:[&:nth-child(8)]:col-span-2 lg:[&:nth-child(4)]:col-span-2 lg:[&:nth-child(10)]:col-span-2';

const Categories = () => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  const onCategoryClick = (id, event) => {
    dispatch(
      fetchRecipes({
        categoryid: id,
      })
    );
    dispatch(selectCategory(id));
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
      {categories.map((category) => (
        <li key={category.id} className={categoryClasses}>
          <CategoryCard {...category} onClick={onCategoryClick} />
        </li>
      ))}
    </ul>
  );
};

export default Categories;
