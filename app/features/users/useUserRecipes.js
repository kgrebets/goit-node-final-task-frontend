// import { useQuery } from '@tanstack/react-query';
// import UsersApi from '../../api-client/src/api/UsersApi.js';

// export default function useUserRecipes(userId, options = {}) {
//   const { page = 1, limit = 10 } = options;
  
//   return useQuery({
//     queryKey: ['userRecipes', userId, page, limit],
//     queryFn: async () => {
//       const api = new UsersApi();
//       const response = await api.apiUsersUserIdRecipesGet(userId, { page, limit });
      
//       console.log('API Response structure:', response);
      
//       // Получаем массив рецептов из response.data
//       // Скорее всего рецепты в response.data.recipes или просто response.data
//       const recipes = response.data?.recipes || response.data || [];
//       const totalCount = response.totalCount || 0;
//       const totalPages = response.totalPages || 1;
      
//       console.log('Extracted recipes:', recipes);
      
//       return {
//         recipes: recipes,
//         totalCount: totalCount,
//         totalPages: totalPages
//       };
//     },
//     enabled: !!userId,
//   });
// }

import { useQuery } from '@tanstack/react-query';
import UsersApi from '../../api-client/src/api/UsersApi.js';

export default function useUserRecipes(userId, options = {}) {
  const { page = 1, limit = 10 } = options;
  
  return useQuery({
    queryKey: ['userRecipes', userId, page, limit],
    queryFn: async () => {
      const api = new UsersApi();
      const response = await api.apiUsersUserIdRecipesGet(userId, { page, limit });
      
      console.log('FULL API RESPONSE:', response);
      
      // API возвращает {total: X, page: X, totalPages: X}
      // Рецепты могут быть в response.data или прямо в response
      const recipes = response.data || [];
      const totalCount = response.total || 0;
      const totalPages = response.totalPages || 1;
      
      console.log('Recipes array:', recipes);
      console.log('Is array?', Array.isArray(recipes));
      
      return {
        recipes: Array.isArray(recipes) ? recipes : [],
        totalCount: totalCount,
        totalPages: totalPages
      };
    },
    enabled: !!userId,
  });
}