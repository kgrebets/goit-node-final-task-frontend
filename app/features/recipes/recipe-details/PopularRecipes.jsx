import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RecipesApi from '../../../api-client/src/api/RecipesApi';
import RecipeCard from '../../../components/recipes/RecipeCard';

import {
  fetchStart,
  fetchSuccess,
  fetchError,
  clearPopularRecipes,
} from '../../../redux/recipes/popularRecipesSlice';

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

    return () => {
      dispatch(clearPopularRecipes());
    };
  }, [dispatch]);

  if (isLoading) return <div>Loading popular recipes...</div>;
  if (error) return <div>{error}</div>;
  if (!items.length) return null;

  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 py-6">
      <section className="">
        <h2 className="text-xl">Popular recipes</h2>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-4">
          {items.map((recipe) => (
            <div key={recipe.id} className="w-[152px] flex-none">
              <RecipeCard
                id={recipe.id}
                title={recipe.title}
                description={recipe.description}
                thumb={recipe.thumb}
                authorName={recipe.Creator?.username}
                avatar={recipe.Creator.avatar}
                favoritesCount={recipe.favoritesCount}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
