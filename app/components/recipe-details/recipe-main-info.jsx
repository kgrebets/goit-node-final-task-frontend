import UserBadgeButton from './user-badge-button';

export default function RecipeMainInfo({ recipe, requireAuth }) {
  if (!recipe) return null;

  const { title, description, time, category, Creator } = recipe;

  return (
    <section className="w-full">
      <h1 className="text-2xl">{title}</h1>

      <div className="mt-5 flex flex-wrap gap-2">
        {category?.name && (
          <span className="rounded-full border border-tertiary p-[10px] text-base text-tertiary">
            {category.name}
          </span>
        )}
        {time && (
          <span className="rounded-full border border-tertiary p-[10px] text-base text-tertiary">
            {time} min
          </span>
        )}
      </div>

      {description && <p className="mt-4 text-sm leading-6">{description}</p>}

      {Creator && (
        <div className="mt-5">
          <UserBadgeButton
            userId={Creator.id}
            username={Creator.username}
            avatar={Creator.avatar}
            requireAuth={requireAuth}
          />
        </div>
      )}
    </section>
  );
}
