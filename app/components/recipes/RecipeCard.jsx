import { Link } from 'react-router-dom';

export default function RecipeCard({
  id,
  title,
  description,
  thumb,
  authorName,
  favoritesCount,
}) {
  return (
    <article className="w-full h-full rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      <Link to={`/recipes/${id}`} className="block">
        <div className="aspect-square bg-gray-100 overflow-hidden">
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-2">
          <h3 className="text-sm font-medium line-clamp-2">{title}</h3>

          {description && (
            <p className="mt-1 text-xs text-gray-600 line-clamp-2">
              {description}
            </p>
          )}

          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>{authorName || 'Unknown author'}</span>
            <span>❤️</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
