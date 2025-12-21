import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import UsersApi from '../../../api-client/src/api/UsersApi.js';
import { useFollow } from '../../../features/users/useFollow.js';
import TabContent from '../ui/tab-content';
import FollowerItem from '../ui/follower-item';
import Pagination from '../ui/pagination';

const usersApi = new UsersApi();

const PAGE_PARAM = 'followersPage';
const ITEMS_PER_PAGE = 5;

const FollowersTab = ({ userId, isCurrentUser = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const followMutation = useFollow();
  const page = parseInt(searchParams.get(PAGE_PARAM) || '1', 10);
  const targetUserId = userId || 'me';

  const {
    data: followersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['followers', targetUserId],
    queryFn: async () => {
      if (targetUserId === 'me') {
        const user = await usersApi.apiUsersMeGet();
        return usersApi.apiUsersUserIdFollowersGet(user.id);
      }
      return usersApi.apiUsersUserIdFollowersGet(targetUserId);
    },
    enabled: Boolean(targetUserId),
  });

  const followers = Array.isArray(followersData) ? followersData : [];

  // Client-side pagination
  const totalPages = Math.ceil(followers.length / ITEMS_PER_PAGE);
  const paginatedFollowers = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return followers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [followers, page]);

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(PAGE_PARAM, newPage.toString());
    setSearchParams(newParams);
  };

  const handleFollow = (id) => {
    followMutation.mutate(
      { userId: id, action: 'follow' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['followers', targetUserId]);
          queryClient.invalidateQueries(['user', id]);
        },
      }
    );
  };

  return (
    <>
      <TabContent
        isLoading={isLoading}
        error={error?.message || error}
        items={paginatedFollowers}
        emptyMessage="No followers yet"
        loadingMessage="Loading followers..."
        renderItem={(follower) => (
          <FollowerItem
            id={follower.id}
            avatar={follower.avatar}
            name={follower.name}
            username={follower.username}
            recipesCount={follower.recipesCount || 0}
            recipes={follower.recipes || []}
            onFollow={handleFollow}
          />
        )}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default FollowersTab;
