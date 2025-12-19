import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveFilter,
  selectFilters,
} from '../../redux/slices/filters/filtersSlice.js';
import { fetchFilters } from '../../redux/slices/filters/filtersOps.js';
import { fetchRecipes } from '../../redux/slices/recipes/recipesOps.js';
import { selectSelectedCategory } from '../../redux/slices/categories/categoriesSlice.js';
import Select from '../ui/select.jsx';

const RecipeFilters = () => {
  const filters = useSelector(selectFilters);
  const currentCategoryId = useSelector(selectSelectedCategory);
  const [selectedFilters, setSelectedFilters] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      ...selectedFilters,
      categoryid: currentCategoryId.id,
    };

    if (selectedFilters) {
      dispatch(fetchRecipes(payload));
      dispatch(saveFilter(payload));
    } else {
      dispatch(fetchFilters());
    }
  }, [selectedFilters]);

  const onFilterChange = (name, value) => {
    // Clear empty values to not be passed as empty query param to request
    setSelectedFilters((prevState) => {
      const nextState = { ...prevState };

      if (value == null || value === '') {
        delete nextState[name];
      } else {
        nextState[name] = value;
      }

      return nextState;
    });
  };

  return (
    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-3.5">
      {filters.map((filter) => (
        <Select
          options={filter.items}
          name={filter.name}
          key={filter.name}
          optionPlaceholderText={filter.label}
          onChange={(event) => onFilterChange(filter.name, event.target.value)}
        />
      ))}
    </div>
  );
};

export default RecipeFilters;
