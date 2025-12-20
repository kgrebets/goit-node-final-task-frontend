import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RecipesApi from '../../../api-client/src/api/RecipesApi';
import PopularRecipes from '../ui/popular-recipes';

import {
  fetchStart,
  fetchSuccess,
  fetchError,
  clearPopularRecipes,
} from '../../../redux/slices/recipes/popularRecipesSlice';

export default function PopularRecipesContainer() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state) => state.popularRecipes
  );

  useEffect(() => {
    const load = async () => {
      const api = new RecipesApi();
      dispatch(fetchStart());
      try {
        const res = await api.apiRecipesPopularGet();
        dispatch(fetchSuccess(res));
      } catch (e) {
        dispatch(fetchError(e?.message || 'Failed to load popular recipes'));
      }
    };

    load();
    return () => dispatch(clearPopularRecipes());
  }, [dispatch]);

  return (
    <PopularRecipes items={data ?? []} isLoading={isLoading} error={error} />
  );
}
