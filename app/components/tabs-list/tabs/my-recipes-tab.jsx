import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import UsersApi from '../../../api-client/src/api/UsersApi.js';
import RecipesApi from '../../../api-client/src/api/RecipesApi.js';
import TabContent from '../ui/tab-content';
import RecipeItem from '../ui/recipe-item';
import Pagination from '../ui/pagination';

const usersApi = new UsersApi();
const recipesApi = new RecipesApi();

const PAGE_PARAM = 'recipesPage';

const MyRecipesTab = ({ userId, isCurrentUser = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page = parseInt(searchParams.get(PAGE_PARAM) || '1', 10);
  const targetUserId = userId || 'me';

  const {
    data: recipesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user-recipes', targetUserId, page],
    queryFn: async () => {
      if (isCurrentUser) {
        return usersApi.apiUsersRecipesGet({ page, limit: 9 });
      }
      return usersApi.apiUsersUserIdRecipesGet(targetUserId, {
        page,
        limit: 9,
      });
    },
    enabled: Boolean(targetUserId),
  });

  // После исправления моделей, данные доступны как через 'recipes', так и через 'results'
  const recipes = recipesData?.recipes || recipesData?.results || [];
  const totalPages = recipesData?.totalPages || 1;
  const currentPage = recipesData?.page || 1;

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(PAGE_PARAM, newPage.toString());
    setSearchParams(newParams);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    try {
      await recipesApi.apiRecipesIdDelete(id);
      queryClient.invalidateQueries(['user-recipes', targetUserId]);
      queryClient.invalidateQueries(['user-recipes']);
    } catch (error) {
      console.error('Failed to delete recipe:', error);
      alert('Failed to delete recipe. Please try again.');
    }
  };

  return (
    <>
      <TabContent
        isLoading={isLoading}
        error={error?.message || error}
        items={recipes}
        emptyMessage="No recipes yet"
        loadingMessage="Loading recipes..."
        renderItem={(recipe) => (
          <RecipeItem
            id={recipe.id}
            thumb={recipe.thumb}
            title={recipe.title}
            description={recipe.description}
            onDelete={isCurrentUser ? handleDelete : undefined}
          />
        )}
      />
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default MyRecipesTab;
