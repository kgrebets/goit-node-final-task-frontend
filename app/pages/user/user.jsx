import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import UsersApi from '../../api-client/src/api/UsersApi.js';
import UserInfo from '../../components/user-info';
import { useFollow } from '../../features/users/useFollow.js';
import LogOutModal from '../../components/auth/logout-modal/logout-modal.jsx';
import { useState } from 'react';

const usersApi = new UsersApi();

const User = () => {
  const { id } = useParams();
  const followMutation = useFollow();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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

  const isOwnProfile = !id || id === 'me';

  const handleFollow = () => {
    if (!user?.id) return;
    followMutation.mutate({ 
      userId: user.id, 
      action: user.isFollowing ? 'unfollow' : 'follow' 
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold tracking-tight">Profile</h1>
          
          <UserInfo user={user} isOwnProfile={isOwnProfile} />
          
          <div className="mt-8 flex justify-center">
            {isOwnProfile ? (
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="btn btn-primary"
                style={{
                  width: '394px',
                  height: '56px',
                  borderRadius: '30px',
                  padding: '16px 162px',
                  gap: '8px',
                  background: '#1A1A1A',
                  color: 'white',
                  border: 'none'
                }}
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={handleFollow}
                disabled={followMutation.isPending}
                className="btn btn-primary disabled:opacity-50"
                style={{
                  width: '394px',
                  height: '56px',
                  borderRadius: '30px',
                  padding: '16px 162px',
                  gap: '8px',
                  background: '#1A1A1A',
                  color: 'white',
                  border: 'none'
                }}
              >
                {user?.isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {isOwnProfile && (
        <LogOutModal 
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
        />
      )}
    </>
  );
};

export default User;