import { useQuery } from '@tanstack/react-query';
import UsersApi from '../../api-client/src/api/UsersApi.js';

export default function useUserRecipes(userId, options = {}) {
  const { page = 1, limit = 10 } = options;

  return useQuery({
    queryKey: ['userRecipes', userId, page, limit],
    queryFn: async () => {
      const api = new UsersApi();
      const response = await api.apiUsersUserIdRecipesGet(userId, {
        page,
        limit,
      });

      const recipes = response.data || [];
      const totalCount = response.total || 0;
      const totalPages = response.totalPages || 1;

      return {
        recipes: Array.isArray(recipes) ? recipes : [],
        totalCount: totalCount,
        totalPages: totalPages,
      };
    },
    enabled: !!userId,
  });
}
