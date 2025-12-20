import { createAsyncThunk } from '@reduxjs/toolkit';
import { RecipesApi } from '../../../api-client/src/index.js';

export const fetchPopularRecipes = createAsyncThunk(
  'popularRecipes/fetchPopularRecipes',
  async (_, thunkAPI) => {
    try {
      const recipesApi = new RecipesApi();
      return await recipesApi.apiRecipesPopularGet();
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e?.response?.data || e?.message || 'Failed to load popular recipes'
      );
    }
  }
);
