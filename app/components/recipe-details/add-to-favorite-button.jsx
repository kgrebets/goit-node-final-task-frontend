export default function AddToFavoriteButton({
  recipeId,
  isFavorite,
  onClick,
  disabled,
}) {
  return (
    <button
      type="button"
      className="btn-primary"
      onClick={onClick}
      disabled={disabled}
    >
      {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    </button>
  );
}
