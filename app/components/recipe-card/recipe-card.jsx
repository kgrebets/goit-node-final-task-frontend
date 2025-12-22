import React from 'react';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { twMerge } from 'tailwind-merge';

import Icon from '../Icon/index.js';
import getAvatarImageUrl from '../../helpers/getAvatarImageUrl.js';
import { useAuth } from '../../features/auth/AuthProvider.jsx';
import {
  addRecipeToFavorite,
  removeRecipeFromFavorite,
} from '../../redux/slices/recipes/recipesOps.js';
import getCloudImage from '../../helpers/getRecipeImage.js';

const RecipeCard = ({
  Creator,
  thumb,
  title,
  description,
  id,
  isFavorite = false,
}) => {
  const dispatch = useDispatch();
  const { isLoggedIn, openSignIn } = useAuth();

  const handleWishlistClick = async () => {
    if (!isLoggedIn) {
      openSignIn();
      return;
    }

    if (isFavorite) {
      await dispatch(removeRecipeFromFavorite(id));
    } else {
      await dispatch(addRecipeToFavorite(id));
    }
  };

  return (
    <div>
      <img
        src={getCloudImage(thumb)}
        className="w-full h-64 object-cover rounded-7.5 mb-4"
        alt={title}
        loading="lazy"
      />

      <h3 className="text-lg font-extrabold tracking-tight uppercase mb-2 line-clamp-1">
        {title}
      </h3>

      <p className="mb-2 line-clamp-2 min-h-12">{description}</p>

      <div className="flex items-center justify-between">
        <Link
          to={`/user/${Creator.id}`}
          className="flex items-center gap-2"
          onClick={(e) => {
            if (!isLoggedIn) {
              e.preventDefault();
              openSignIn();
            }
          }}
        >
          {Creator.avatar ? (
            <img
              src={getAvatarImageUrl(Creator.avatar)}
              alt={Creator.username}
              className="w-10 h-10 object-cover rounded-full"
            />
          ) : (
            <span className="font-bold text-tertiary rounded-full border border-tertiary bg-white text-avatar-sm w-10 h-10 flex items-center justify-center">
              {Creator.username.charAt(0)}
            </span>
          )}
          <strong>{Creator.username}</strong>
        </Link>

        <div className="flex gap-1 items-center">
          <div className="group">
            <button
              type="button"
              onClick={handleWishlistClick}
              className={twMerge(
                'p-2.5',
                isFavorite
                  ? 'bg-primary border-tertiary'
                  : 'bg-white border-tertiary'
              )}
            >
              <span className="sr-only">
                {isFavorite ? 'Remove' : 'Add'} {title} to wishlist
              </span>

              <Icon
                name="heart"
                size={18}
                className={isFavorite ? 'text-white' : 'text-primary'}
              />
            </button>
          </div>

          <Link to={`/recipe/${id}`} className="btn p-2.5">
            <span className="sr-only">Open {title}</span>
            <Icon name="arrow-up-right" size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
