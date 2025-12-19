import React from 'react';
import { Link } from 'react-router';
import Icon from '../Icon/index.js';

const RecipeCard = ({ Creator, thumb, title, description, id }) => {
  // TODO: Need redux action to add to wishlist

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
        <div className="flex">
          {Creator.avatar ? (
            <img src={Creator.avatar} alt={Creator.username} />
          ) : null}
          <strong>{Creator.username}</strong>
        </div>
        <div className="flex gap-1 items-center">
          <button className="p-2.5">
            <span className="sr-only">Add {title} to wishlist</span>
            <Icon name="heart" size={18} />
          </button>
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
