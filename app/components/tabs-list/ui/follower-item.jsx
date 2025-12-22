import { Link, useNavigate } from 'react-router';
import Icon from '../../Icon';
import getAvatarImageUrl from '../../../helpers/getAvatarImageUrl';
import getCloudImage from '../../../helpers/getRecipeImage.js';
import { useAuth } from '../../../features/auth/AuthProvider.jsx';

export default function FollowerItem({
  id,
  avatar,
  name,
  email,
  username,
  recipesCount = 0,
  recipes = [],
  onFollow,
  isFollowing = false,
}) {
  const navigate = useNavigate();
  const displayName = name || username || 'User';
  const initial = displayName.charAt(0).toUpperCase();
  const auth = useAuth();

  const handleViewProfile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/user/${id}`);
  };

  return (
    <div className="flex gap-4 md:gap-6 py-4 items-center">
      <div className="flex-shrink-0">
        <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-lg md:text-xl font-bold text-gray-700">
          {avatar ? (
            <img
              src={getAvatarImageUrl(avatar)}
              alt={displayName}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <span>{initial}</span>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-base md:text-lg font-bold uppercase tracking-tight mb-1">
          {displayName.toUpperCase()}
        </h3>
        <p className="text-sm md:text-base text-tertiary mb-2">
          Own recipes: {recipesCount}
        </p>
        {onFollow && auth.user && auth.user.email !== email && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFollow(id);
            }}
            className="px-4 py-2 text-sm md:text-base font-bold uppercase tracking-tight rounded-lg border border-tertiary hover:bg-primary/10 transition-colors"
          >
            {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
          </button>
        )}
      </div>

      {recipes && recipes.length > 0 && (
        <div className="flex gap-2 flex-shrink-0">
          {recipes.slice(0, 3).map((recipe, index) => (
            <Link
              key={recipe.id || index}
              to={`/recipe/${recipe.id}`}
              className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden"
            >
              <img
                src={getCloudImage(recipe.thumb)}
                alt={recipe.title || `Recipe ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={handleViewProfile}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-tertiary hover:bg-primary/10 transition-colors flex-shrink-0 p-0 aspect-square"
        aria-label={`View ${displayName} profile`}
      >
        <Icon name="arrow-up-right" size={18} className="text-primary" />
      </button>
    </div>
  );
}
