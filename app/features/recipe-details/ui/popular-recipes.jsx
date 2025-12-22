import RecipeCard from '../../../components/recipe-card/recipe-card';
import ErrorMessage from '../../../components/ui/error-message';

export default function PopularRecipes({ items, isLoading, error }) {
  if (isLoading) return <div></div>;
  if (error)
    return (
      <div>
        <ErrorMessage />
      </div>
    );
  if (!items.length) return null;

  return (
    <div className="container my-16 md:my-24 2xl:my-32">
      <section>
        <h2 className="text-xl mb-6">Popular recipes</h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-x-5 md:gap-y-10 mt-8 md:mt-10">
          {items.map((recipe) => (
            <li
              className="w-full md:max-w-[342px] desktop:max-w-[305px]"
              key={recipe.id}
            >
              <RecipeCard
                id={recipe.id}
                title={recipe.title}
                description={recipe.description}
                thumb={recipe.thumb}
                isFavorite={recipe.isFavorite}
                Creator={recipe.Creator}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
