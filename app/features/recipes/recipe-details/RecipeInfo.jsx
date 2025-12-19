import RecipeMainInfo from '../../../components/recipe-details/RecipeMainInfo';
import RecipeIngredients from '../../../components/recipe-details/RecipeIngredients';
import RecipePreparation from '../../../components/recipe-details/RecipePreparation';

export default function RecipeInfo({ recipe, isLoading, error, requireAuth }) {
  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-screen-sm px-4 py-6">
        <p>Loading recipe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-screen-sm px-4 py-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="mx-auto w-full max-w-screen-sm px-4 py-6">
        <p>Recipe not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 py-6">
      <RecipeMainInfo recipe={recipe} requireAuth={requireAuth} />

      <div className="mt-6">
        <RecipeIngredients items={recipe.recipeIngredients || []} />
      </div>

      <div className="mt-6">
        <RecipePreparation text={recipe.instructions} />
      </div>
    </div>
  );
}
