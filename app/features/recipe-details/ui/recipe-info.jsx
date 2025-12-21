import {
  RecipeMainInfo,
  RecipeIngredients,
  RecipePreparation,
} from '../../../components/recipe-details';

import PathInfo from '../../../components/path-info';
import ErrorMessage from '../../../components/ui/error-message';
import Loader from '../../../components/ui/loader';

export default function RecipeInfo({ recipe, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ErrorMessage />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="mx-auto w-full px-4 md:px-16 desktop:px-20 pt-16 md:pt-16 desktop:pt-20">
        <p>Recipe not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full desktop:max-w-[90rem] px-4 md:px-8 desktop:px-20 mt-16 desktop:mt-20">
      <PathInfo current={recipe.title} />
      <div className="mt-8 md:mt-10">
        <div className="desktop:grid desktop:grid-cols-[minmax(0,560px)_minmax(0,1fr)] desktop:gap-x-20">
          {recipe.thumb && (
            <div className="desktop:sticky desktop:top-20">
              <div className="overflow-hidden rounded-7.5">
                <img
                  src={recipe.thumb}
                  alt={recipe.title}
                  className="h-[318px] md:h-[400px] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          <div className={recipe.thumb ? 'mt-8 md:mt-10 desktop:mt-0' : ''}>
            <RecipeMainInfo recipe={recipe} />

            <div className="mt-6">
              <RecipeIngredients items={recipe.recipeIngredients || []} />
            </div>

            <div className="mt-6">
              <RecipePreparation
                text={recipe.instructions}
                recipeId={recipe.id}
                isFavorite={recipe.isFavorite}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
