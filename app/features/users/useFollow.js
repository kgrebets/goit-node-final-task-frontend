import { useMutation, useQueryClient } from '@tanstack/react-query';
import UsersApi from '../../api-client/src/api/UsersApi.js';

export function useFollow() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, action }) => {
      const api = new UsersApi();
      if (action === 'follow') {
        return api.apiUsersUserIdFollowersPost(userId);
      } else if (action === 'unfollow') {
        return api.apiUsersUserIdFollowersDelete(userId);
      }
      throw new Error('Invalid action');
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries(['user', variables.userId]);
      queryClient.invalidateQueries(['followers']);
      queryClient.invalidateQueries(['following']);
    },
  });
}