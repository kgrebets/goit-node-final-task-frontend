import { createAsyncThunk } from '@reduxjs/toolkit';
import { IngredientsApi, AreasApi } from '../../../api-client/src/index.js';

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  async (_, thunkAPI) => {
    try {
      const ingredientsApi = new IngredientsApi();
      const areasApi = new AreasApi();

      const [ingredients, areas] = await Promise.all([
        ingredientsApi.apiIngredientsGetWithHttpInfo({
          page: 1,
          limit: Number.MAX_SAFE_INTEGER
        }),
        areasApi.apiAreasGetWithHttpInfo(),
      ]);

      // Name should match queryParam since it is used for requesting a specific filter
      return [
        {
          label: 'Ingredients',
          name: 'ingredientid',
          items: ingredients.response.body.results,
        },
        {
          label: 'Areas',
          name: 'areaid',
          items: areas.response.body,
        },
      ];
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
