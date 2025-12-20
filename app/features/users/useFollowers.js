import { useQuery } from '@tanstack/react-query';
import UsersApi from '../../api-client/src/api/UsersApi.js';

export default function useFollowers(userId) {
  return useQuery({
    queryKey: ['followers', userId],
    queryFn: async () => {
      const api = new UsersApi();
      const response = await api.apiUsersUserIdFollowersGet(userId);
      return response.data || response;
    },
    enabled: !!userId,
  });
}