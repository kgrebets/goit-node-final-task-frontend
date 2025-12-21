import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import UsersApi from '../../../api-client/src/api/UsersApi.js';
import TabContent from '../ui/tab-content';
import RecipeItem from '../ui/recipe-item';
import Pagination from '../ui/pagination';

const usersApi = new UsersApi();

const PAGE_PARAM = 'recipesPage';

const MyRecipesTab = ({ userId, isCurrentUser = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
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
            onDelete={
              isCurrentUser
                ? (id) => {
                    // TODO: Add delete functionality
                    console.log('Delete recipe:', id);
                  }
                : undefined
            }
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
