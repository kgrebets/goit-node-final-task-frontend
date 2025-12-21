import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import RecipesApi from '../../../api-client/src/api/RecipesApi.js';
import TabContent from '../ui/tab-content';
import RecipeItem from '../ui/recipe-item';
import Pagination from '../ui/pagination';

const recipesApi = new RecipesApi();

const PAGE_PARAM = 'favoritesPage';

const MyFavoritesTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get(PAGE_PARAM) || '1', 10);

  const {
    data: favoritesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['my-favorites', page],
    queryFn: () => recipesApi.apiRecipesFavoritesGet({ page, limit: 9 }),
  });

  const responseData = favoritesData?.data || favoritesData;
  const favorites = responseData?.recipes || responseData?.results || [];
  const totalPages = responseData?.totalPages || favoritesData?.totalPages || 1;
  const currentPage =
    responseData?.page ||
    favoritesData?.page ||
    favoritesData?.currentPage ||
    1;

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
        items={favorites}
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
        page={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default MyFavoritesTab;
