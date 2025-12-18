import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import RecipesApi from '../../../api-client/src/api/RecipesApi';

import {
  fetchStart,
  fetchSuccess,
  fetchError,
  clearRecipeDetails,
} from '../../../redux/recipes/recipeDetailsSlice';

export default function RecipeDetailsContainer() {
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p>Loading recipe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p>Recipe not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>

      {data.thumb ? (
        <img
          src={data.thumb}
          alt={data.title}
          className="w-full max-w-2xl rounded-xl mb-4"
        />
      ) : null}

      {data.description ? <p className="mb-4">{data.description}</p> : null}

      <h2 className="text-xl font-semibold mt-6 mb-2">Ingredients</h2>
      <ul className="list-disc pl-6">
        {(data.recipeIngredients || []).map((ri, idx) => (
          <li key={idx}>
            {ri?.ingredient?.name} — {ri?.measure}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Instructions</h2>
      <p className="whitespace-pre-line">{data.instructions}</p>
    </div>
  );
}
