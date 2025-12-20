import { useMutation, useQueryClient } from '@tanstack/react-query';
import RecipesApi from '../../api-client/src/api/RecipesApi.js';

export function useDeleteRecipe() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (recipeId) => {
      const api = new RecipesApi();
      return api.apiRecipesRecipeIdDelete(recipeId);
    },
    onSuccess: () => {
      // Просто инвалидируем кэш - React Query сам перезагрузит данные
      queryClient.invalidateQueries(['userRecipes']);
      queryClient.invalidateQueries(['recipes']);
    },
  });
}