import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RecipesApi from '../../../api-client/src/api/RecipesApi';
import RecipeCard from '../../../components/recipe-card/recipe-card';

import {
  fetchStart,
  fetchSuccess,
  fetchError,
  clearPopularRecipes,
} from '../../../redux/slices/recipes/popularRecipesSlice';

export default function PopularRecipes() {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector(
    (state) => state.popularRecipes
  );

  const items = data ?? [];

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

  if (isLoading) return <div>Loading popular recipes...</div>;
  if (error) return <div>{error}</div>;
  if (!items.length) return null;

  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 py-6">
      <section>
        <h2 className="text-xl mb-6">Popular recipes</h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-5 md:gap-y-10">
          {items.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard
                id={recipe.id}
                title={recipe.title}
                description={recipe.description}
                thumb={recipe.thumb}
                Creator={recipe.Creator}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
