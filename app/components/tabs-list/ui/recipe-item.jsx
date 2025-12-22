import { Link } from 'react-router';
import Icon from '../../Icon';
import getCloudImage from '../../../helpers/getRecipeImage.js';

export default function RecipeItem({
  id,
  thumb,
  title,
  description,
  onDelete,
}) {
  return (
    <div className="flex gap-4 md:gap-6 py-4 transition-colors">
      <Link
        to={`/recipe/${id}`}
        className="flex-shrink-0 w-25 h-25 rounded-lg overflow-hidden"
      >
        <img
          src={getCloudImage(thumb)}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/recipe/${id}`} className="block">
          <h3 className="text-base md:text-lg font-bold uppercase tracking-tight mb-2 line-clamp-1">
            {title}
          </h3>
          <p className="text-sm md:text-base text-tertiary line-clamp-2">
            {description}
          </p>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-2 flex-shrink-0">
        <Link
          to={`/recipe/${id}`}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-tertiary hover:bg-primary/10 transition-colors"
          aria-label={`View ${title}`}
        >
          <Icon name="arrow-up-right" size={18} />
        </Link>
        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(id);
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-tertiary hover:bg-primary/10 transition-colors p-0"
            aria-label={`Delete ${title}`}
          >
            <Icon name="trash" size={18} className="text-primary" />
          </button>
        )}
      </div>
    </div>
  );
}
