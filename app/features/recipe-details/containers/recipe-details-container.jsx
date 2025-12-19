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

  const recipe = useSelector((state) => state.recipeDetails.data);
  const isLoading = useSelector((state) => state.recipeDetails.isLoading);

  useEffect(() => {
    if (!id) return;

    if (isLoading) return;
    if (recipe?.id === id) return;

    const api = new RecipesApi();

    const load = async () => {
      dispatch(fetchStart());
      try {
        const res = await api.apiRecipesIdGet(id);
        dispatch(fetchSuccess(res));
      } catch (e) {
        dispatch(fetchError(e?.message || 'No recipe found'));
      }
    };

    load();
    return () => {
      dispatch(clearRecipeDetails());
    };
  }, [id, dispatch, recipe?.id, isLoading]);

  return <RecipeInfo recipe={recipe} requireAuth={requireAuth} />;
}
