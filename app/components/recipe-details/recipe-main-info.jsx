import UserBadgeButton from './user-badge-button';

export default function RecipeMainInfo({ recipe, requireAuth }) {
  if (!recipe) return null;

  const { title, description, thumb, time, category, Creator } = recipe;

  return (
    <section className="w-full">
      {thumb && (
        <div className="overflow-hidden rounded-7.5">
          <img
            src={thumb}
            alt={title}
            className="h-[220px] w-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="mt-5">
        <h1 className="text-2xl">{title}</h1>

        <div className="mt-3 flex flex-wrap gap-2">
          {category?.name && (
            <span className="rounded-full border border-tertiary px-3 py-1 text-xs text-tertiary">
              {category.name}
            </span>
          )}
          {time && (
            <span className="rounded-full border border-tertiary px-3 py-1 text-xs text-tertiary">
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
      </div>
    </section>
  );
}
