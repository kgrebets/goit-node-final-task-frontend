import { useDispatch } from 'react-redux';
import {
  addRecipeToFavorite,
  removeRecipeFromFavorite,
} from '../../redux/slices/recipes/recipesOps.js';
import { useAuth } from '../../features/auth/AuthProvider.jsx';

export default function AddToFavoriteButton({ recipeId, isFavorite = false }) {
  const dispatch = useDispatch();
  const { isLoggedIn, openSignIn } = useAuth();
  const onClick = async () => {
    if (!isLoggedIn) {
      openSignIn();
      return;
    }

    if (isFavorite) {
      dispatch(removeRecipeFromFavorite(recipeId));
    } else {
      dispatch(addRecipeToFavorite(recipeId));
    }
  };

  return (
    <button
      type="button"
      className={`
    px-4 py-2
    rounded-full
    border
    transition-none

    ${
      isFavorite
        ? 'bg-primary text-white border-primary'
        : 'bg-white text-primary border-primary'
    }
  `}
      onClick={onClick}
    >
      {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    </button>
  );
}
