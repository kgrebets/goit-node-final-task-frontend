import { useQuery } from '@tanstack/react-query';
import UsersApi from '../../api-client/src/api/UsersApi.js';

export default function useUser(userId) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const api = new UsersApi();
      
      console.log('🔥 useUser - запрашиваем userId:', userId);
      
      try {
        const response = await api.apiUsersUserIdGet(userId);
        const data = response?.data || response;
        
        console.log('🔥 useUser - данные:', data);
        console.log('🔥 useUser - isFollowing:', data?.isFollowing);
        const userData = {
          id: data?.id,
          avatar: data?.avatar,
          name: data?.name,
          email: data?.email,
          recipesCount: data?.recipesCount || 0,
          followersCount: data?.followersCount || 0,
          isFollowing: Boolean(data?.isFollowing),
          favoritesCount: data?.favoritesCount || 0,
          followingCount: data?.followingCount || 0
        };
        
        console.log('🔥 useUser - возвращаем:', userData);
        return userData;
        
      } catch (error) {
        console.error('🔥 useUser - ошибка:', error);
        throw error;
      }
    },
    enabled: !!userId,
  });
}
