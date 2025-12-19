import IngredientCard from '../ingredient-card';

export default function RecipeIngredients({ items = [] }) {
  if (!items.length) return null;

  return (
    <section>
      <h2 className="text-xl">Ingredients</h2>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-4">
        {items.map((ri) => {
          const ing = ri?.ingredient;
          const key = ing?.id || `${ing?.name}-${ri?.measure}`;

          return (
            <div key={key} className="w-[152px] flex-none">
              <IngredientCard
                name={ing?.name || 'Unknown'}
                measure={ri?.measure}
                img={ing?.img}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
