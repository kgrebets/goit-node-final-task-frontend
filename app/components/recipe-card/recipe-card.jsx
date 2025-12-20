import React from 'react';
import { Link } from 'react-router';
import Icon from '../Icon/index.js';
import { twMerge } from 'tailwind-merge';
import { useDispatch } from 'react-redux';
import { addRecipeToFavorite, removeRecipeFromFavorite } from '../../redux/slices/recipes/recipesOps.js';
import getAvatarImageUrl from '../../helpers/getAvatarImageUrl.js';
import { useAuth } from '../../features/auth/AuthProvider.jsx';

const RecipeCard = ({ Creator, thumb, title, description, id, isFavorite = false }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, openSignIn } = useAuth();


  const handleWishlistClick = (isFavorite) => {
    if (!isLoggedIn) {
      return openSignIn();
    }
    
    isFavorite ? dispatch(removeRecipeFromFavorite(id)) : dispatch(addRecipeToFavorite(id));
  }

  return (
    <div>
      <img
        src={thumb}
        className="w-full h-64 object-cover rounded-7.5 mb-4"
        alt={title}
        loading="lazy"
      />
      <h3 className="text-lg font-extrabold tracking-tight uppercase mb-2">
        {title}
      </h3>
      <p className="mb-2 line-clamp-2 min-h-12">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Creator.avatar ? (
            <img src={getAvatarImageUrl(Creator.avatar)} alt={Creator.username} className="w-10 h-10 object-cover rounded-full"/>
          ) : null}
          <strong>{Creator.username}</strong>
        </div>
        <div className="flex gap-1 items-center">
          <div className="group">
            <button
              onClick={(e) => handleWishlistClick(isFavorite, e)}
              className={twMerge(
              'p-2.5',
              isFavorite
                ? 'bg-primary border-primary group-hover:bg-white group-hover:border-tertiary'
                : 'bg-white group-hover:bg-primary group-hover:border-primary'
            )}>
              <span className="sr-only">{isFavorite ? 'Remove' : 'Add'} {title} to wishlist</span>
              <Icon name="heart" size={18} className={
                isFavorite
                ? 'text-white group-hover:text-primary'
                : 'text-primary group-hover:text-white'
              } />
            </button>
          </div>
          <Link to={`/recipe/${id}`} className="btn p-2.5">
            <span className="sr-only">Open ${thumb}</span>
            <Icon name="arrow-up-right" size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
