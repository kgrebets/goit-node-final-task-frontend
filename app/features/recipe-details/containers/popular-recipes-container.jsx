import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PopularRecipes from '../ui/popular-recipes';

import {
  selectPopularRecipes,
  selectPopularRecipesLoading,
  selectPopularRecipesError,
  clearPopularRecipes,
} from '../../../redux/slices/recipes/popularRecipesSlice';

import { fetchPopularRecipes } from '../../../redux/slices/recipes/popularRecipesOps';

export default function PopularRecipesContainer() {
  const dispatch = useDispatch();

  const data = useSelector(selectPopularRecipes);
  const isLoading = useSelector(selectPopularRecipesLoading);
  const error = useSelector(selectPopularRecipesError);

  useEffect(() => {
    dispatch(fetchPopularRecipes());

    return () => {
      dispatch(clearPopularRecipes());
    };
  }, [dispatch]);

  return (
    <PopularRecipes items={data ?? []} isLoading={isLoading} error={error} />
  );
}
