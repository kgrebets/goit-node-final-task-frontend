// app/features/users/useUser.js
import { useQuery } from '@tanstack/react-query';
import UsersApi from '../../api-client/src/api/UsersApi.js';

export default function useUser(userId) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const api = new UsersApi();
      const response = await api.apiUsersUserIdGet(userId);
      return response;
    },
    enabled: !!userId,
  });
}