// import { useParams } from 'react-router';
// import { useAuth } from '../../features/auth/AuthProvider.jsx';
// import useUser from '../../features/users/useUser.js';
// import useUserRecipes from '../../features/users/useUserRecipes.js';
// import useFollowers from '../../features/users/useFollowers.js';
// import useFollowing from '../../features/users/useFollowing.js';
// import useFavorites from '../../features/users/useFavorites.js';
// import { useFollow } from '../../features/users/useFollow.js';
// import { useDeleteRecipe } from '../../features/recipes/useDeleteRecipe.js';
// import { useRemoveFromFavorites } from '../../features/recipes/useRemoveFromFavorites.js';
// import PathInfo from '../../components/ui/PathInfo/PathInfo.jsx';
// import MainTitle from '../../components/ui/MainTitle/MainTilte.jsx';
// import Subtitle from '../../components/ui/Subtitle/Subtitle.jsx';
// import UserInfo from '../../components/user/UserInfo/UserInfo.jsx';
// import TabsList from '../../components/ui/TabsList/TabsList.jsx';
// import ListPagination from '../../components/ui/ListPagination/ListPagination.jsx';
// import RecipePreview from '../../components/user/RecipePreview/RecipePreview.jsx';
// import UserCard from '../../components/user/UserCard/UserCard.jsx';
// import { useState, useCallback } from 'react';

// export default function UserPage() {
//   const { id: userId } = useParams();
//   const { user: currentUser } = useAuth();
//   const { data: user, isLoading, error } = useUser(userId);
  
//   const [activeTab, setActiveTab] = useState('recipes');
//   const [recipesPage, setRecipesPage] = useState(1);
//   const [favoritesPage, setFavoritesPage] = useState(1);
  
//   const ITEMS_PER_PAGE = 10;
  
//   // Хуки для данных вкладок
//   const { 
//     data: recipesData, 
//     isLoading: recipesLoading,
//     refetch: refetchRecipes
//   } = useUserRecipes(userId, { 
//     page: recipesPage, 
//     limit: ITEMS_PER_PAGE 
//   });
  
//   const { 
//     data: followersData, 
//     isLoading: followersLoading
//   } = useFollowers(userId);
  
//   const { 
//     data: followingData, 
//     isLoading: followingLoading
//   } = useFollowing(userId);
  
//   const { 
//     data: favoritesData, 
//     isLoading: favoritesLoading,
//     refetch: refetchFavorites
//   } = useFavorites(userId, { 
//     page: favoritesPage, 
//     limit: ITEMS_PER_PAGE 
//   });
  
//   // Хуки для мутаций
//   const { mutate: followUser, isLoading: isFollowingLoading } = useFollow();
//   const { mutate: deleteRecipe, isLoading: isDeletingRecipe } = useDeleteRecipe();
//   const { mutate: removeFromFav, isLoading: isRemovingFromFav } = useRemoveFromFavorites();
  
//   const isOwnProfile = currentUser?.id === userId;
  
//   // Обработчики событий
//   const handleFollow = useCallback((targetUserId, isCurrentlyFollowing) => {
//     followUser({
//       userId: targetUserId,
//       action: isCurrentlyFollowing ? 'unfollow' : 'follow'
//     });
//   }, [followUser]);
  
//   const handleDeleteRecipe = useCallback(async (recipeId) => {
//     if (window.confirm('Are you sure you want to delete this recipe?')) {
//       await deleteRecipe(recipeId);
//       refetchRecipes();
//     }
//   }, [deleteRecipe, refetchRecipes]);
  
//   const handleRemoveFromFavorites = useCallback(async (recipeId) => {
//     if (window.confirm('Remove from favorites?')) {
//       await removeFromFav(recipeId);
//       refetchFavorites();
//     }
//   }, [removeFromFav, refetchFavorites]);
  
//   // Обработчик смены вкладки с сбросом пагинации
//   const handleTabChange = useCallback((tab) => {
//     setActiveTab(tab);
//     if (tab === 'recipes') {
//       setRecipesPage(1);
//     } else if (tab === 'favorites') {
//       setFavoritesPage(1);
//     }
//   }, []);
  
//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center py-10">Loading user data...</div>
//       </div>
//     );
//   }
  
//   if (error || !user) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center py-10 text-red-600">User not found</div>
//       </div>
//     );
//   }
  
//   const renderTabContent = () => {
//     const tabIsLoading = 
//       (activeTab === 'recipes' && recipesLoading) ||
//       (activeTab === 'followers' && followersLoading) ||
//       (activeTab === 'following' && followingLoading) ||
//       (activeTab === 'favorites' && favoritesLoading);
    
//     if (tabIsLoading) {
//       return (
//         <div className="text-center py-8">
//           <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         </div>
//       );
//     }
    
//     switch (activeTab) {
//       case 'recipes': {
//         // Проверяем структуру данных
//         let recipes = [];
//         let recipesTotalPages = 1;
        
//         if (recipesData) {
//           // Вариант 1: если API возвращает массив напрямую
//           if (Array.isArray(recipesData)) {
//             recipes = recipesData;
//           }
//           // Вариант 2: если API возвращает объект с полем data
//           else if (Array.isArray(recipesData.data)) {
//             recipes = recipesData.data;
//             recipesTotalPages = recipesData.totalPages || 1;
//           }
//           // Вариант 3: если API возвращает объект с полем recipes
//           else if (Array.isArray(recipesData.recipes)) {
//             recipes = recipesData.recipes;
//             recipesTotalPages = recipesData.totalPages || 1;
//           }
//           // Вариант 4: если API возвращает другой формат
//           else {
//             console.log('Recipes data format:', recipesData);
//             recipes = [];
//           }
//         }
        
//         if (recipes.length === 0) {
//           return (
//             <div className="text-center py-8 text-gray-500">
//               <p>No recipes yet</p>
//               {isOwnProfile && (
//                 <p className="mt-2">Create your first recipe to share with others!</p>
//               )}
//             </div>
//           );
//         }
        
//         return (
//           <>
//             <div className="space-y-4">
//               {recipes.map(recipe => (
//                 <RecipePreview 
//                   key={recipe.id || recipe._id} 
//                   recipe={recipe} 
//                   showDelete={isOwnProfile}
//                   onDelete={() => handleDeleteRecipe(recipe.id || recipe._id)}
//                   isDeleting={isDeletingRecipe}
//                 />
//               ))}
//             </div>
//             {recipesTotalPages > 1 && (
//               <div className="mt-8">
//                 <ListPagination 
//                   currentPage={recipesPage}
//                   totalPages={recipesTotalPages}
//                   onPageChange={setRecipesPage}
//                 />
//               </div>
//             )}
//           </>
//         );
//       }
        
//       case 'followers': {
//         // Проверяем формат данных для followers
//         let followers = [];
        
//         if (followersData) {
//           if (Array.isArray(followersData)) {
//             followers = followersData;
//           } else if (Array.isArray(followersData.data)) {
//             followers = followersData.data;
//           } else {
//             console.log('Followers data format:', followersData);
//             followers = [];
//           }
//         }
        
//         if (followers.length === 0) {
//           return (
//             <div className="text-center py-8 text-gray-500">
//               <p>No followers yet</p>
//             </div>
//           );
//         }
        
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {followers.map(follower => (
//               <UserCard 
//                 key={follower.id || follower._id} 
//                 user={follower}
//                 showFollowButton={!isOwnProfile && currentUser?.id !== (follower.id || follower._id)}
//                 isFollowing={follower.isFollowing}
//                 onFollow={() => handleFollow(follower.id || follower._id, follower.isFollowing)}
//                 isFollowLoading={isFollowingLoading}
//               />
//             ))}
//           </div>
//         );
//       }
        
//       case 'following': {
//         // Проверяем формат данных для following
//         let following = [];
        
//         if (followingData) {
//           if (Array.isArray(followingData)) {
//             following = followingData;
//           } else if (Array.isArray(followingData.data)) {
//             following = followingData.data;
//           } else {
//             console.log('Following data format:', followingData);
//             following = [];
//           }
//         }
        
//         if (following.length === 0) {
//           return (
//             <div className="text-center py-8 text-gray-500">
//               <p>Not following anyone yet</p>
//             </div>
//           );
//         }
        
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {following.map(followedUser => (
//               <UserCard 
//                 key={followedUser.id || followedUser._id} 
//                 user={followedUser}
//                 showFollowButton={!isOwnProfile && currentUser?.id !== (followedUser.id || followedUser._id)}
//                 isFollowing={true}
//                 onFollow={() => handleFollow(followedUser.id || followedUser._id, true)}
//                 isFollowLoading={isFollowingLoading}
//               />
//             ))}
//           </div>
//         );
//       }
        
//       case 'favorites': {
//         // Проверяем формат данных для favorites
//         let favorites = [];
//         let favoritesTotalPages = 1;
        
//         if (favoritesData) {
//           if (Array.isArray(favoritesData)) {
//             favorites = favoritesData;
//           } else if (Array.isArray(favoritesData.data)) {
//             favorites = favoritesData.data;
//             favoritesTotalPages = favoritesData.totalPages || 1;
//           } else if (Array.isArray(favoritesData.recipes)) {
//             favorites = favoritesData.recipes;
//             favoritesTotalPages = favoritesData.totalPages || 1;
//           } else {
//             console.log('Favorites data format:', favoritesData);
//             favorites = [];
//           }
//         }
        
//         if (favorites.length === 0) {
//           return (
//             <div className="text-center py-8 text-gray-500">
//               <p>No favorite recipes yet</p>
//             </div>
//           );
//         }
        
//         return (
//           <>
//             <div className="space-y-4">
//               {favorites.map(recipe => (
//                 <RecipePreview 
//                   key={recipe.id || recipe._id} 
//                   recipe={recipe} 
//                   showDelete={isOwnProfile}
//                   onDelete={() => handleRemoveFromFavorites(recipe.id || recipe._id)}
//                   deleteLabel="Remove from favorites"
//                   isDeleting={isRemovingFromFav}
//                 />
//               ))}
//             </div>
//             {favoritesTotalPages > 1 && (
//               <div className="mt-8">
//                 <ListPagination 
//                   currentPage={favoritesPage}
//                   totalPages={favoritesTotalPages}
//                   onPageChange={setFavoritesPage}
//                 />
//               </div>
//             )}
//           </>
//         );
//       }
        
//       default:
//         return <div className="text-center py-8">Select a tab to view content</div>;
//     }
//   };
  
//   return (
//     <div className="container mx-auto px-4 py-8 max-w-6xl">
//       <PathInfo currentPage={user.name} />
//       <MainTitle>{isOwnProfile ? 'My Profile' : `${user.name}'s Profile`}</MainTitle>
//       <Subtitle>All information about {user.name}</Subtitle>
      
//       <UserInfo 
//         user={user} 
//         isOwnProfile={isOwnProfile}
//         recipesCount={recipesData?.totalCount || 0}
//         followersCount={Array.isArray(followersData) ? followersData.length : 
//                         (followersData?.data?.length || followersData?.length || 0)}
//         followingCount={Array.isArray(followingData) ? followingData.length : 
//                         (followingData?.data?.length || followingData?.length || 0)}
//         favoritesCount={favoritesData?.totalCount || 0}
//       />
      
//       <TabsList 
//         activeTab={activeTab} 
//         onTabChange={handleTabChange}
//       />
      
//       {renderTabContent()}
//     </div>
//   );
// }

import { useParams } from 'react-router';
import { useAuth } from '../../features/auth/AuthProvider.jsx';
import useUser from '../../features/users/useUser.js';
import useUserRecipes from '../../features/users/useUserRecipes.js';
import useFollowers from '../../features/users/useFollowers.js';
import useFollowing from '../../features/users/useFollowing.js';
import useFavorites from '../../features/users/useFavorites.js';
import { useFollow } from '../../features/users/useFollow.js';
import { useDeleteRecipe } from '../../features/recipes/useDeleteRecipe.js';
import { useRemoveFromFavorites } from '../../features/recipes/useRemoveFromFavorites.js';
import PathInfo from '../../components/ui/PathInfo/PathInfo.jsx';
import MainTitle from '../../components/ui/MainTitle/MainTilte.jsx';
import Subtitle from '../../components/ui/Subtitle/Subtitle.jsx';
import UserInfo from '../../components/user/UserInfo/UserInfo.jsx';
import TabsList from '../../components/ui/TabsList/TabsList.jsx';
import ListPagination from '../../components/ui/ListPagination/ListPagination.jsx';
import RecipePreview from '../../components/user/RecipePreview/RecipePreview.jsx';
import UserCard from '../../components/user/UserCard/UserCard.jsx';
import { useState, useCallback } from 'react';

export default function UserPage() {
  const { id: userId } = useParams();
  const { user: currentUser } = useAuth();
  const { data: user, isLoading, error } = useUser(userId);
  
  const [activeTab, setActiveTab] = useState('recipes');
  const [recipesPage, setRecipesPage] = useState(1);
  const [favoritesPage, setFavoritesPage] = useState(1);
  
  const ITEMS_PER_PAGE = 10;
  
  const { 
    data: recipesData, 
    isLoading: recipesLoading,
    refetch: refetchRecipes
  } = useUserRecipes(userId, { 
    page: recipesPage, 
    limit: ITEMS_PER_PAGE 
  });
  
  const { 
    data: followersData, 
    isLoading: followersLoading
  } = useFollowers(userId);
  
  const { 
    data: followingData, 
    isLoading: followingLoading
  } = useFollowing(userId);
  
  const { 
    data: favoritesData, 
    isLoading: favoritesLoading,
    refetch: refetchFavorites
  } = useFavorites(userId, { 
    page: favoritesPage, 
    limit: ITEMS_PER_PAGE 
  });
  
  const { mutate: followUser, isLoading: isFollowingLoading } = useFollow();
  const { mutate: deleteRecipe, isLoading: isDeletingRecipe } = useDeleteRecipe();
  const { mutate: removeFromFav, isLoading: isRemovingFromFav } = useRemoveFromFavorites();
  
  const isOwnProfile = currentUser?.id === userId;
  
  const handleFollow = useCallback((targetUserId, isCurrentlyFollowing) => {
    followUser({
      userId: targetUserId,
      action: isCurrentlyFollowing ? 'unfollow' : 'follow'
    });
  }, [followUser]);
  
  const handleDeleteRecipe = useCallback(async (recipeId) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      await deleteRecipe(recipeId);
      refetchRecipes();
    }
  }, [deleteRecipe, refetchRecipes]);
  
  const handleRemoveFromFavorites = useCallback(async (recipeId) => {
    if (window.confirm('Remove from favorites?')) {
      await removeFromFav(recipeId);
      refetchFavorites();
    }
  }, [removeFromFav, refetchFavorites]);
  
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    if (tab === 'recipes') {
      setRecipesPage(1);
    } else if (tab === 'favorites') {
      setFavoritesPage(1);
    }
  }, []);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-10">Loading user data...</div>
      </div>
    );
  }
  
  if (error || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-10 text-red-600">User not found</div>
      </div>
    );
  }
  
  const renderTabContent = () => {
    const tabIsLoading = 
      (activeTab === 'recipes' && recipesLoading) ||
      (activeTab === 'followers' && followersLoading) ||
      (activeTab === 'following' && followingLoading) ||
      (activeTab === 'favorites' && favoritesLoading);
    
    if (tabIsLoading) {
      return (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }
    
    switch (activeTab) {
      case 'recipes': {
        const recipes = recipesData?.recipes || [];
        const recipesTotalPages = recipesData?.totalPages || 1;
        
        if (recipes.length === 0) {
          return (
            <div className="text-center py-8 text-gray-500">
              <p>No recipes yet</p>
              {isOwnProfile && (
                <p className="mt-2">Create your first recipe to share with others!</p>
              )}
            </div>
          );
        }
        
        return (
          <>
            <div className="space-y-4">
              {recipes.map(recipe => (
                <RecipePreview 
                  key={recipe.id} 
                  recipe={recipe} 
                  showDelete={isOwnProfile}
                  onDelete={() => handleDeleteRecipe(recipe.id)}
                  isDeleting={isDeletingRecipe}
                />
              ))}
            </div>
            {recipesTotalPages > 1 && (
              <div className="mt-8">
                <ListPagination 
                  currentPage={recipesPage}
                  totalPages={recipesTotalPages}
                  onPageChange={setRecipesPage}
                />
              </div>
            )}
          </>
        );
      }
        
      case 'followers': {
        const followers = followersData || [];
        
        if (followers.length === 0) {
          return (
            <div className="text-center py-8 text-gray-500">
              <p>No followers yet</p>
            </div>
          );
        }
        
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {followers.map(follower => (
              <UserCard 
                key={follower.id} 
                user={follower}
                showFollowButton={!isOwnProfile && currentUser?.id !== follower.id}
                onFollow={handleFollow}
                isFollowLoading={isFollowingLoading}
              />
            ))}
          </div>
        );
      }
        
      case 'following': {
        const following = followingData || [];
        
        if (following.length === 0) {
          return (
            <div className="text-center py-8 text-gray-500">
              <p>Not following anyone yet</p>
            </div>
          );
        }
        
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {following.map(followedUser => (
              <UserCard 
                key={followedUser.id} 
                user={followedUser}
                showFollowButton={!isOwnProfile && currentUser?.id !== followedUser.id}
                onFollow={handleFollow}
                isFollowLoading={isFollowingLoading}
              />
            ))}
          </div>
        );
      }
        
      case 'favorites': {
        const favorites = favoritesData?.recipes || [];
        const favoritesTotalPages = favoritesData?.totalPages || 1;
        
        if (favorites.length === 0) {
          return (
            <div className="text-center py-8 text-gray-500">
              <p>No favorite recipes yet</p>
            </div>
          );
        }
        
        return (
          <>
            <div className="space-y-4">
              {favorites.map(recipe => (
                <RecipePreview 
                  key={recipe.id} 
                  recipe={recipe} 
                  showDelete={isOwnProfile}
                  onDelete={() => handleRemoveFromFavorites(recipe.id)}
                  deleteLabel="Remove from favorites"
                  isDeleting={isRemovingFromFav}
                />
              ))}
            </div>
            {favoritesTotalPages > 1 && (
              <div className="mt-8">
                <ListPagination 
                  currentPage={favoritesPage}
                  totalPages={favoritesTotalPages}
                  onPageChange={setFavoritesPage}
                />
              </div>
            )}
          </>
        );
      }
        
      default:
        return <div className="text-center py-8">Select a tab to view content</div>;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <PathInfo currentPage={user.name} />
      <MainTitle>{isOwnProfile ? 'My Profile' : `${user.name}'s Profile`}</MainTitle>
      <Subtitle>All information about {user.name}</Subtitle>
      
      <UserInfo 
        user={user} 
        isOwnProfile={isOwnProfile}
      />
      
      <TabsList 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
      />
      
      {renderTabContent()}
    </div>
  );
}