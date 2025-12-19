import RecipeCard from '../../../components/recipe-card/recipe-card';

export default function PopularRecipes({ items, isLoading, error }) {
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
