import AddToFavoriteButton from './add-to-favorite-button';

export default function RecipePreparation({ recipeId, text, isFavorite }) {
  return (
    <section className="mt-8 md:mt-10">
      <h2 className="text-xl">Recipe preparation</h2>

      {text ? (
        <p className="mt-5 whitespace-pre-line text-sm leading-6 text-secondary">
          {text}
        </p>
      ) : (
        <p className="mt-4 text-sm text-tertiary">No instructions</p>
      )}

      <div className="mt-8 md:mt-10">
        <AddToFavoriteButton recipeId={recipeId} isFavorite={isFavorite} />
      </div>
    </section>
  );
}
