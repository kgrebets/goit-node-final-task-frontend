import { createAsyncThunk } from '@reduxjs/toolkit';
import { RecipesApi } from '../../../api-client/src/index.js';
export const fetchPopularRecipes = createAsyncThunk(
  'popularRecipes/fetchPopularRecipes',
  async (payload, thunkAPI) => {
    try {
      const recipesApi = new RecipesApi();
      return await recipesApi.apiRecipesPopularGet(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e?.response?.data || e?.message || 'Failed to load popular recipes'
      );
    }
  }
);
