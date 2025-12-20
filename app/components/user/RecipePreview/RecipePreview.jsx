import { Link } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import  RecipesApi  from '../../../api-client/src/api/RecipesApi.js';
import ArrowUpRightIcon from '../../icons/arrow-up-right.jsx';
import TrashIcon from '../../icons/trash.jsx';

export default function RecipePreview({ recipe, showDelete = false, onDelete }) {
  const queryClient = useQueryClient();
  
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }
    
    try {
      const api = new RecipesApi();
      await api.apiRecipesIdDelete(recipe.id);
      
      queryClient.invalidateQueries(['user-recipes']);
      queryClient.invalidateQueries(['user', recipe.userId]);
      
      if (onDelete) onDelete(recipe.id);
    } catch (error) {
      console.error('Failed to delete recipe:', error);
    }
  };
  
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className="shrink-0">
          <img 
            src={recipe.image || '/default-recipe.jpg'} 
            alt={recipe.title}
            className="w-32 h-32 object-cover rounded-lg"
          />
        </div>
        
        <div className="grow">
          <h3 className="text-lg font-bold mb-2">{recipe.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {recipe.description || 'No description'}
          </p>
          
          <div className="flex justify-between items-center">
            <Link 
              to={`/recipe/${recipe.id}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
              aria-label="View recipe details"
            >
              <span className="mr-1">View</span>
              <ArrowUpRightIcon width={20} height={20} />
            </Link>
            
            {showDelete && (
              <button
                onClick={handleDelete}
                type="button"
                className="text-red-500 hover:text-red-700 p-1"
                aria-label="Delete recipe"
              >
                <TrashIcon width={20} height={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}