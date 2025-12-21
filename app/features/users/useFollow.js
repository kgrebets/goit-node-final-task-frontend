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
    onMutate: async ({ userId, action }) => {
      await queryClient.cancelQueries({ queryKey: ['user', userId] });
      const previousUser = queryClient.getQueryData(['user', userId]);

      queryClient.setQueryData(['user', userId], (old) => {
        if (!old) return old;
        return {
          ...old,
          isFollowing: action === 'follow',
          followersCount:
            action === 'follow'
              ? (old.followersCount || 0) + 1
              : Math.max(0, (old.followersCount || 1) - 1),
        };
      });

      return { previousUser };
    },
    onError: (err, { userId }, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['user', userId], context.previousUser);
      }
    },
  });
}
