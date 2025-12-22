import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import UsersApi from '../../../api-client/src/api/UsersApi.js';
import { useFollow } from '../../../features/users/useFollow.js';
import TabContent from '../ui/tab-content';
import FollowerItem from '../ui/follower-item';
import Pagination from '../ui/pagination';

const usersApi = new UsersApi();

const PAGE_PARAM = 'followingPage';
const ITEMS_PER_PAGE = 5;

const FollowingTab = ({ userId, isCurrentUser = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const followMutation = useFollow();
  const page = parseInt(searchParams.get(PAGE_PARAM) || '1', 10);
  const targetUserId = userId || 'me';

  const {
    data: followingData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['following', targetUserId],
    queryFn: async () => {
      if (targetUserId === 'me') {
        const user = await usersApi.apiUsersMeGet();
        return usersApi.apiUsersFollowingGet(user.id);
      }
      return usersApi.apiUsersFollowingGet(targetUserId);
    },
    enabled: Boolean(targetUserId),
  });

  const following = Array.isArray(followingData) ? followingData : [];

  // Client-side pagination
  const totalPages = Math.ceil(following.length / ITEMS_PER_PAGE);
  const paginatedFollowing = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return following.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [following, page]);

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(PAGE_PARAM, newPage.toString());
    setSearchParams(newParams);
  };

  const handleUnfollow = (id) => {
    followMutation.mutate(
      { userId: id, action: 'unfollow' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['following', targetUserId]);
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
        items={paginatedFollowing}
        emptyMessage="Not following anyone yet"
        loadingMessage="Loading following..."
        renderItem={(user) => (
          <FollowerItem
            id={user.id}
            avatar={user.avatar}
            name={user.name}
            username={user.username}
            email={user.email}
            recipesCount={user.recipesCount || 0}
            recipes={user.recipes || []}
            onFollow={handleUnfollow}
            isFollowing={true}
          />
        )}
      />
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default FollowingTab;
