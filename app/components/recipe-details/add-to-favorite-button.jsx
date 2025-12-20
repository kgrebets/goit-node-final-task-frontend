import { useDispatch } from 'react-redux';
import { addRecipeToFavorite, removeRecipeFromFavorite } from '../../redux/slices/recipes/recipesOps.js';
import { useAuth } from '../../features/auth/AuthProvider.jsx';

export default function AddToFavoriteButton({ recipeId, isFavorite }) {
  const dispatch = useDispatch();
  const {isLoggedIn, openSignIn } = useAuth();

  const onClick = () => {
    if (!isLoggedIn) {
      openSignIn();

      return;
    }

    isFavorite ? dispatch(removeRecipeFromFavorite(recipeId)) : dispatch(addRecipeToFavorite(recipeId));
  };

  return (
    <button
      type="button"
      className="btn-primary"
      onClick={onClick}
    >
      {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    </button>
  );
}
