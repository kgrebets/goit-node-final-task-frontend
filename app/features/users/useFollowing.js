import { useQuery } from '@tanstack/react-query';
import UsersApi from '../../api-client/src/api/UsersApi.js';

export default function useFollowing(userId) {
  return useQuery({
    queryKey: ['following', userId],
    queryFn: async () => {
      const api = new UsersApi();
      const response = await api.apiUsersFollowingGet(userId);
      return response.data || response;
    },
    enabled: !!userId,
  });
}