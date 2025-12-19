import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RecipesApi from '../../../api-client/src/api/RecipesApi';
import PopularRecipes from '../ui/popular-recipes';

import {
  fetchStart,
  fetchSuccess,
  fetchError,
} from '../../../redux/slices/recipes/popularRecipesSlice';

export default function PopularRecipesContainer() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.popularRecipes.data ?? []);
  const isLoading = useSelector((state) => state.popularRecipes.isLoading);

  useEffect(() => {
    if (items.length || isLoading) return;

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
  }, [dispatch, items.length, isLoading]);

  return <PopularRecipes items={items} />;
}
