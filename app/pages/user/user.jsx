import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import UsersApi from '../../api-client/src/api/UsersApi.js';
import UserInfo from '../../components/user-info';

const usersApi = new UsersApi();

const User = () => {
  const { id } = useParams();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', id ?? 'me'],
    queryFn: () => {
      if (id && id !== 'me') {
        return usersApi.apiUsersUserIdGet(id);
      }
      return usersApi.apiUsersMeGet();
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="animate-pulse">
            <div className="mb-8 h-9 w-32 rounded bg-white/10"></div>
            <div className="flex flex-col items-center rounded-[30px] border border-secondary px-[80px] py-[40px]">
              <div className="h-[80px] w-[80px] rounded-full bg-white/10"></div>
              <div className="mt-4 h-10 w-10 rounded-full bg-white/10"></div>
              <div className="mt-6 w-full space-y-2">
                <div className="h-5 w-48 rounded bg-white/10"></div>
                <div className="h-5 w-36 rounded bg-white/10"></div>
                <div className="h-5 w-32 rounded bg-white/10"></div>
                <div className="h-5 w-32 rounded bg-white/10"></div>
                <div className="h-5 w-32 rounded bg-white/10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[30px] border border-red-500/20 bg-red-500/10 p-8 text-center">
            <p className="text-red-400">Failed to load user profile</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Profile</h1>
        <UserInfo user={user} />
      </div>
    </div>
  );
};

export default User;

