import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectRecipeDetails,
  selectRecipeDetailsLoading,
  selectRecipeDetailsError,
  clearRecipeDetails,
} from '../../../redux/slices/recipes/recipeDetailsSlice';

import { fetchRecipeDetails } from '../../../redux/slices/recipes/recipeDetailsOps';

import RecipeInfo from '../ui/recipe-info';

export default function RecipeDetailsContainer({ requireAuth }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const data = useSelector(selectRecipeDetails);
  const isLoading = useSelector(selectRecipeDetailsLoading);
  const error = useSelector(selectRecipeDetailsError);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchRecipeDetails(id));

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
