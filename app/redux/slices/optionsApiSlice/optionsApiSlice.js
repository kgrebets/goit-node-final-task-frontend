import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AreasApi from '../../../api-client/src/api/AreasApi';
import CategoriesApi from '../../../api-client/src/api/CategoriesApi';
import IngredientsApi from '../../../api-client/src/api/IngredientsApi';
import ApiClient from '../../../api-client/src/ApiClient';
const ingredientsApi = new IngredientsApi();
const areasApi = new AreasApi();
const categoriesApi = new CategoriesApi();

export const optionsApi = createApi({
  reducerPath: 'optionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: ApiClient.instance.basePath }),
  endpoints: (builder) => ({
    getIngredientsList: builder.query({
      async queryFn({ page = 1, limit = Number.MAX_SAFE_INTEGER } = {}) {
        try {
          const response = await ingredientsApi.apiIngredientsGet({
            page,
            limit,
          });

          return {
            data: response,
          };
        } catch (error) {
          return {
            error: {
              status: error.status || 500,
              data: error,
            },
          };
        }
      },
    }),

    getAreas: builder.query({
      async queryFn() {
        try {
          const response = await areasApi.apiAreasGet();
          return { data: response };
        } catch (error) {
          return { error };
        }
      },
    }),

    getCategories: builder.query({
      async queryFn() {
        try {
          const response = await categoriesApi.apiCategoriesGet();
          return { data: response };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useGetIngredientsListQuery,
  useGetAreasQuery,
  useGetCategoriesQuery,
} = optionsApi;
