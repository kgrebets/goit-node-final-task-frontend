import { createAsyncThunk } from '@reduxjs/toolkit';
import { RecipesApi } from '../../../api-client/src/index.js';

export const fetchRecipeDetails = createAsyncThunk(
  'recipeDetails/fetchRecipeDetails',
  async (id, thunkAPI) => {
    try {
      const recipesApi = new RecipesApi();
      return await recipesApi.apiRecipesIdGet(id);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e?.response?.data || e?.message || 'Failed to load recipe details'
      );
    }
  }
);
