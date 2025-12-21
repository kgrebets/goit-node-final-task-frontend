import React from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import Tab from './ui/tab';
import MyRecipesTab from './tabs/my-recipes-tab';
import MyFavoritesTab from './tabs/my-favorites-tab';
import FollowersTab from './tabs/followers-tab';
import FollowingTab from './tabs/following-tab';

const PAGE_PARAMS = {
  RECIPES: 'recipesPage',
  FAVORITES: 'favoritesPage',
  FOLLOWERS: 'followersPage',
  FOLLOWING: 'followingPage',
};

const ALL_TABS = [
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

const PUBLIC_TABS = [
  {
    label: 'RECIPES',
    value: 'my-recipes',
  },
  {
    label: 'FOLLOWERS',
    value: 'followers',
  },
];

const TabsList = ({ userId }) => {
  const { id: urlUserId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const isUrlMe = urlUserId === 'me' || !urlUserId;
  const isCurrentUser = isUrlMe;

  const targetUserId = userId || (isUrlMe ? 'me' : urlUserId);

  // Determine which tabs to show
  const availableTabs = isCurrentUser ? ALL_TABS : PUBLIC_TABS;

  // Get active tab, default to first available tab
  const activeTab = searchParams.get('tab') || availableTabs[0].value;

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

  return (
    <div>
      <ul className="flex gap-6 md:gap-8 border-b border-[#BFBEBE]">
        {availableTabs.map((tab) => (
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
          <MyRecipesTab userId={targetUserId} isCurrentUser={isCurrentUser} />
        )}
        {activeTab === 'my-favorites' && isCurrentUser && <MyFavoritesTab />}
        {activeTab === 'followers' && (
          <FollowersTab userId={targetUserId} isCurrentUser={isCurrentUser} />
        )}
        {activeTab === 'following' && isCurrentUser && (
          <FollowingTab userId={targetUserId} isCurrentUser={isCurrentUser} />
        )}
      </div>
    </div>
  );
};

export default TabsList;
