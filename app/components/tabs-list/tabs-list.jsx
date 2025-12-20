import React, { useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import UsersApi from '../../api-client/src/api/UsersApi.js';
import RecipesApi from '../../api-client/src/api/RecipesApi.js';
import Tab from './ui/tab';

import RecipeItem from './ui/recipe-item';
import FollowerItem from './ui/follower-item';
import TabContent from './ui/tab-content';
import Pagination from './ui/pagination';

const usersApi = new UsersApi();
const recipesApi = new RecipesApi();

const PAGE_PARAMS = {
  RECIPES: 'recipesPage',
  FAVORITES: 'favoritesPage',
  FOLLOWERS: 'followersPage',
  FOLLOWING: 'followingPage',
};

const TABS = [
  {
    label: 'MY RECIPES',
    value: 'my-recipes',
  },
  {
    label: 'MY FAVORITES',
    value: 'my-favorites',
  },
  {
    label: 'FOLLOWERS',
    value: 'followers',
  },
  {
    label: 'FOLLOWING',
    value: 'following',
  },
];

const TabsList = ({ userId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id: urlUserId } = useParams();
  const activeTab = searchParams.get('tab') || 'my-recipes';

  // Determine userId: prop > URL param > 'me' for current user
  const targetUserId = userId || urlUserId || 'me';

  // Get page from URL or default to 1
  const myRecipesPage = parseInt(
    searchParams.get(PAGE_PARAMS.RECIPES) || '1',
    10
  );
  const myFavoritesPage = parseInt(
    searchParams.get(PAGE_PARAMS.FAVORITES) || '1',
    10
  );
  const followersPage = parseInt(
    searchParams.get(PAGE_PARAMS.FOLLOWERS) || '1',
    10
  );
  const followingPage = parseInt(
    searchParams.get(PAGE_PARAMS.FOLLOWING) || '1',
    10
  );

  // Fetch my recipes
  const {
    data: myRecipesData,
    isLoading: myRecipesLoading,
    error: myRecipesError,
  } = useQuery({
    queryKey: ['my-recipes', myRecipesPage],
    queryFn: () =>
      usersApi.apiUsersRecipesGet({ page: myRecipesPage, limit: 9 }),
    enabled: activeTab === 'my-recipes',
  });

  const myRecipes = myRecipesData?.recipes || [];
  const myRecipesTotalPages = myRecipesData?.totalPages || 1;
  const myRecipesCurrentPage = myRecipesData?.currentPage || 1;

  // Fetch my favorites
  const {
    data: myFavoritesData,
    isLoading: myFavoritesLoading,
    error: myFavoritesError,
  } = useQuery({
    queryKey: ['my-favorites', myFavoritesPage],
    queryFn: () =>
      recipesApi.apiRecipesFavoritesGet({ page: myFavoritesPage, limit: 9 }),
    enabled: activeTab === 'my-favorites',
  });

  const myFavorites = myFavoritesData?.recipes || [];
  const myFavoritesTotalPages = myFavoritesData?.totalPages || 1;
  const myFavoritesCurrentPage = myFavoritesData?.currentPage || 1;

  // Fetch followers
  const {
    data: followersData,
    isLoading: followersLoading,
    error: followersError,
  } = useQuery({
    queryKey: ['followers', targetUserId],
    queryFn: () => {
      if (targetUserId === 'me') {
        return usersApi
          .apiUsersMeGet()
          .then((user) => usersApi.apiUsersUserIdFollowersGet(user.id));
      }
      return usersApi.apiUsersUserIdFollowersGet(targetUserId);
    },
    enabled: activeTab === 'followers' && Boolean(targetUserId),
  });

  const followers = Array.isArray(followersData) ? followersData : [];

  // Client-side pagination for followers (5 items per page)
  const followersLimit = 5;
  const followersTotalPages = Math.ceil(followers.length / followersLimit);
  const paginatedFollowers = useMemo(() => {
    const startIndex = (followersPage - 1) * followersLimit;
    return followers.slice(startIndex, startIndex + followersLimit);
  }, [followers, followersPage, followersLimit]);

  // Fetch following
  const {
    data: followingData,
    isLoading: followingLoading,
    error: followingError,
  } = useQuery({
    queryKey: ['following', targetUserId],
    queryFn: () => {
      if (targetUserId === 'me') {
        return usersApi
          .apiUsersMeGet()
          .then((user) => usersApi.apiUsersFollowingGet(user.id));
      }
      return usersApi.apiUsersFollowingGet(targetUserId);
    },
    enabled: activeTab === 'following' && Boolean(targetUserId),
  });

  const following = Array.isArray(followingData) ? followingData : [];

  // Client-side pagination for following (5 items per page)
  const followingLimit = 5;
  const followingTotalPages = Math.ceil(following.length / followingLimit);
  const paginatedFollowing = useMemo(() => {
    const startIndex = (followingPage - 1) * followingLimit;
    return following.slice(startIndex, startIndex + followingLimit);
  }, [following, followingPage, followingLimit]);

  const handleTabClick = (tab) => {
    // Keep existing page params, don't reset them
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', tab);
    // Only set page to 1 if it doesn't exist for this tab
    const pageParamMap = {
      'my-recipes': PAGE_PARAMS.RECIPES,
      'my-favorites': PAGE_PARAMS.FAVORITES,
      followers: PAGE_PARAMS.FOLLOWERS,
      following: PAGE_PARAMS.FOLLOWING,
    };
    const pageParam = pageParamMap[tab];
    if (pageParam && !newParams.has(pageParam)) {
      newParams.set(pageParam, '1');
    }
    setSearchParams(newParams);
  };

  const handlePageChange = (pageParam, page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(pageParam, page.toString());
    setSearchParams(newParams);
  };

  return (
    <div>
      <ul className="flex gap-6 md:gap-8 border-b border-[#BFBEBE]">
        {TABS.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            isActive={activeTab === tab.value}
            onClick={() => handleTabClick(tab.value)}
          />
        ))}
      </ul>

      <div className="pt-5">
        {activeTab === 'my-recipes' && (
          <>
            <TabContent
              isLoading={myRecipesLoading}
              error={myRecipesError?.message || myRecipesError}
              items={myRecipes}
              emptyMessage="No recipes yet"
              loadingMessage="Loading recipes..."
              renderItem={(recipe) => (
                <RecipeItem
                  id={recipe.id}
                  thumb={recipe.thumb}
                  title={recipe.title}
                  description={recipe.description}
                  onDelete={(id) => {
                    // TODO: Add delete functionality
                    console.log('Delete recipe:', id);
                  }}
                />
              )}
            />
            <Pagination
              page={myRecipesCurrentPage}
              totalPages={myRecipesTotalPages}
              onPageChange={(page) =>
                handlePageChange(PAGE_PARAMS.RECIPES, page)
              }
            />
          </>
        )}

        {activeTab === 'my-favorites' && (
          <>
            <TabContent
              isLoading={myFavoritesLoading}
              error={myFavoritesError?.message || myFavoritesError}
              items={myFavorites}
              emptyMessage="No favorite recipes yet"
              loadingMessage="Loading favorites..."
              renderItem={(recipe) => (
                <RecipeItem
                  id={recipe.id}
                  thumb={recipe.thumb}
                  title={recipe.title}
                  description={recipe.description}
                />
              )}
            />
            <Pagination
              page={myFavoritesCurrentPage}
              totalPages={myFavoritesTotalPages}
              onPageChange={(page) =>
                handlePageChange(PAGE_PARAMS.FAVORITES, page)
              }
            />
          </>
        )}

        {activeTab === 'followers' && (
          <>
            <TabContent
              isLoading={followersLoading}
              error={followersError?.message || followersError}
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
                  onFollow={(id) => {
                    // TODO: Add follow/unfollow functionality
                    console.log('Follow user:', id);
                  }}
                />
              )}
            />
            <Pagination
              page={followersPage}
              totalPages={followersTotalPages}
              onPageChange={(page) =>
                handlePageChange(PAGE_PARAMS.FOLLOWERS, page)
              }
            />
          </>
        )}

        {activeTab === 'following' && (
          <>
            <TabContent
              isLoading={followingLoading}
              error={followingError?.message || followingError}
              items={paginatedFollowing}
              emptyMessage="Not following anyone yet"
              loadingMessage="Loading following..."
              renderItem={(user) => (
                <FollowerItem
                  id={user.id}
                  avatar={user.avatar}
                  name={user.name}
                  username={user.username}
                  recipesCount={user.recipesCount || 0}
                  recipes={user.recipes || []}
                  onFollow={(id) => {
                    // TODO: Add unfollow functionality
                    console.log('Unfollow user:', id);
                  }}
                  isFollowing={true}
                />
              )}
            />
            {followingTotalPages > 1 && (
              <Pagination
                page={followingPage}
                totalPages={followingTotalPages}
                onPageChange={(page) =>
                  handlePageChange(PAGE_PARAMS.FOLLOWING, page)
                }
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TabsList;
