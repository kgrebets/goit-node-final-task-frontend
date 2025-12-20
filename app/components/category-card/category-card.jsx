import React from 'react';
import Icon from '../Icon/index.js';
import getCategoryImageUrl from '../../helpers/getCategoryImageUrl.js';

const CategoryCard = ({ id, name, height = 369, width = 325, onClick }) => {
  return id !== 'all' ? (
    <div className="grid relative before:absolute before:inset-0 before:bg-primary/20 before:rounded-7.5">
      <img
        src={getCategoryImageUrl(id, name)}
        alt={name}
        className="row-start-1 col-start-1 rounded-7.5 h-92.25 w-full object-cover"
        height={height}
        width={width}
        loading="lazy"
      />
      <div className="row-start-1 col-start-1 p-6 flex items-end gap-1 z-1">
        <div className="bg-white/20 text-white text-xl font-bold rounded-7.5 px-3 py-2 border border-white/20">
          {name}
        </div>
        <button
          type="button"
          className="h-11 w-11 border border-white/20 rounded-7.5 flex items-center justify-center bg-transparent p-0"
          onClick={() => onClick(id)}
        >
          <span className="sr-only">{name}</span>
          <Icon name="arrow-up-right" className="text-white min-w-5 min-h-5" />
        </button>
      </div>
    </div>
  ) : (
    <div className="bg-primary rounded-7.5 h-92.25">
      <button
        onClick={(e) => onClick('all', e)}
        className="text-white text-xl font-bold p-6 flex items-center justify-center h-full hover:bg-transparent hover:border-0 w-full border-0"
      >
        {name}
      </button>
    </div>
  );
};

export default CategoryCard;
