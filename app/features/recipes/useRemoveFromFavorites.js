import { useMutation, useQueryClient } from '@tanstack/react-query';
import UsersApi from '../../api-client/src/api/UsersApi.js';

export function useRemoveFromFavorites() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (recipeId) => {
      const api = new UsersApi();
      return api.apiUsersUserIdFavoritesDelete(recipeId);
    },
    onSuccess: () => {
      // Инвалидируем запрос избранного
      queryClient.invalidateQueries(['favorites']);
      
      // Если нужно, инвалидируем общие данные пользователя
      queryClient.invalidateQueries(['user']);
    },
  });
}