import { useMutation, useQueryClient } from '@tanstack/react-query';
import UsersApi from '../../api-client/src/api/UsersApi.js';

export function useFollow() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, action }) => {
      const api = new UsersApi();
      
      if (action === 'follow') {
        return await api.apiUsersUserIdFollowersPost(userId);
      } else {
        return await api.apiUsersUserIdFollowersDelete(userId);
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['user', variables.userId]
      });
    }
  });
}