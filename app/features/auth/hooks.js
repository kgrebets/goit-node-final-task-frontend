import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './AuthProvider.jsx';
import AuthApi from '../../api-client/src/api/AuthApi';
import ApiClient from '../../api-client/src/ApiClient.js';

const AUTH_QUERY_KEYS = {
  current: ['auth', 'current'],
};

export function useLogin() {
  const queryClient = useQueryClient();
  const { setCredentials } = useAuth();

  return useMutation({
    mutationFn: async (credentials) => {
      const authApi = new AuthApi();
      return authApi.apiAuthLoginPost(credentials);
    },
    onSuccess: (data) => {
      const { token, user } = data;

      setCredentials({
        token,
        user: user || null,
      });

      queryClient.invalidateQueries({
        queryKey: AUTH_QUERY_KEYS.current,
      });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (payload) => {
      const authApi = new AuthApi();
      return authApi.apiAuthRegisterPost(payload);
    },
  });
}

export function useCurrentUser() {
  const { token, setCredentials } = useAuth();

  return useQuery({
    queryKey: AUTH_QUERY_KEYS.current,
    queryFn: () => {
      if (!token) return;
      ApiClient.instance.authentications.bearerAuth.accessToken = token;
      const authApi = new AuthApi();
      return authApi.apiAuthCurrentGet();
    },
    enabled: Boolean(token),
    onSuccess: (data) => {
      const { token: newToken, user } = data;
      setCredentials({
        token: newToken,
        user: user || null,
      });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { token, clearCredentials } = useAuth();

  return useMutation({
    mutationFn: async () => {
      if (!token) return;
      const authApi = new AuthApi();
      return authApi.apiAuthLogoutPost();
    },
    onSettled: () => {
      clearCredentials();
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.current });
    },
  });
}
