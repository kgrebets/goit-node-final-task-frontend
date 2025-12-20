import { useRef, useState } from 'react';
import { useFollow } from '../../../features/users/useFollow.js';
import { useQueryClient } from '@tanstack/react-query';
import UsersApi from '../../../api-client/src/api/UsersApi.js';
import LogOutModal from '../../auth/logout-modal/logout-modal.jsx';

export default function UserInfo({ user, isOwnProfile, onFollow }) {
  const followMutation = useFollow();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  

  console.log('🔴 UserInfo DEBUG:', {
    userId: user?.id,
    userName: user?.name,
    isFollowing: user?.isFollowing,
    isOwnProfile,
    userData: user
  });
  
  if (!user) {
    return (
      <div className="flex gap-6 items-start mb-8">
        <div className="w-32 h-32 rounded-full bg-gray-300 animate-pulse"></div>
        <div className="space-y-4">
          <div className="h-8 w-48 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }
  
  const isFollowing = user?.isFollowing || false;
  
  const handleFollow = () => {
    if (isOwnProfile) return;
    
    console.log('🟢 handleFollow clicked:', {
      userId: user?.id,
      currentIsFollowing: isFollowing,
      newAction: isFollowing ? 'unfollow' : 'follow'
    });
    
    if (!user?.id) {
      console.error('❌ ERROR: user.id is undefined!', user);
      return;
    }
    
    if (onFollow) {
      onFollow(user.id, isFollowing);
    } else {
      followMutation.mutate({ 
        userId: user.id, 
        action: isFollowing ? 'unfollow' : 'follow' 
      });
    }
  };
  
  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      const api = new UsersApi();
      await api.apiUsersMeAvatarPost(file);
      queryClient.invalidateQueries(['user', user.id]);
    } catch (error) {
      console.error('Failed to upload avatar:', error);
    }
  };

  const buttonText = followMutation.isPending 
    ? 'Loading...' 
    : isFollowing ? 'Unfollow' : 'Follow';
  
  return (
    <>
      <div className="flex gap-6 items-start mb-8">
        <div className="relative">
          <img 
            src={user?.avatar || '/default-avatar.png'} 
            alt={user?.name || 'User'}
            className="w-32 h-32 rounded-full object-cover"
          />
          {isOwnProfile && (
            <>
              <input 
                type="file"
                ref={fileInputRef}
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <div 
                className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="text-white text-sm">Change</span>
              </div>
            </>
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold">{user?.name || 'User'}</h2>
          <p className="text-gray-600">{user?.email || 'No email'}</p>
          
          <div className="flex gap-6 mt-4">
            <div>
              <span className="font-bold">{user?.recipesCount || 0}</span>
              <p className="text-sm">Recipes</p>
            </div>
            <div>
              <span className="font-bold">{user?.favoritesCount || 0}</span>
              <p className="text-sm">Favorites</p>
            </div>
            <div>
              <span className="font-bold">{user?.followersCount || 0}</span>
              <p className="text-sm">Followers</p>
            </div>
            <div>
              <span className="font-bold">{user?.followingCount || 0}</span>
              <p className="text-sm">Following</p>
            </div>
          </div>
          
          <div className="mt-4">
            {isOwnProfile ? (
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={handleFollow}
                disabled={followMutation.isPending}
                className={`px-6 py-2 rounded font-medium ${
                  isFollowing 
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } disabled:opacity-50`}
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
      
      <LogOutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
      />
    </>
  );
}