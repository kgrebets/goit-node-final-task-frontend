import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import RecipesApi from '../../../api-client/src/api/RecipesApi';
import {
  fetchStart,
  fetchSuccess,
  fetchError,
  clearRecipeDetails,
} from '../../../redux/slices/recipes/recipeDetailsSlice';

import RecipeInfo from '../ui/recipe-info';

export default function RecipeDetailsContainer({ requireAuth }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector(
    (state) => state.recipeDetails
  );

  useEffect(() => {
    if (!id) return;

    const api = new RecipesApi();

    const load = async () => {
      dispatch(fetchStart());
      try {
        const recipe = await api.apiRecipesIdGet(id);
        console.log('RES keys:', Object.keys(recipe));
        console.log('RES.data keys:', Object.keys(recipe));
        console.log('RES.data.time:', recipe.time);
        dispatch(fetchSuccess(recipe));
      } catch (e) {
        dispatch(fetchError(e?.message || 'No recipe found'));
      }
    };

    load();

    return () => {
      dispatch(clearRecipeDetails());
    };
  }, [id, dispatch]);

  return (
    <RecipeInfo
      recipe={data}
      requireAuth={requireAuth}
      isLoading={isLoading}
      error={error}
    />
  );
}
