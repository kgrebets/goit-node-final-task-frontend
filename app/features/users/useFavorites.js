import { useQuery } from '@tanstack/react-query';
import UsersApi from '../../api-client/src/api/UsersApi.js';

export default function useFavorites(userId, options = {}) {
  const { page = 1, limit = 10 } = options;
  
  return useQuery({
    queryKey: ['favorites', userId, page, limit],
    queryFn: async () => {
      const api = new UsersApi();
      const response = await api.apiUsersUserIdFavoritesGet(userId, { page, limit });
      
      return {
        recipes: response.data || response,
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 1
      };
    },
    enabled: !!userId,
  });
}