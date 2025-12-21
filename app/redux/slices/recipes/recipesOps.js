import { createAsyncThunk } from '@reduxjs/toolkit';
import { RecipesApi } from '../../../api-client/src/index.js';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (payload, thunkAPI) => {
    try {
      const recipesApi = new RecipesApi();

      return await recipesApi.apiRecipesGet(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const addRecipeToFavorite = createAsyncThunk(
  'recipes/addToFavorite',
  async (payload, thunkAPI) => {
    try {
      const recipesApi = new RecipesApi();

      await recipesApi.apiRecipesIdFavoritePost(payload);

      return payload;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const removeRecipeFromFavorite = createAsyncThunk(
  'recipes/removeFromFavorite',
  async (payload, thunkAPI) => {
    try {
      const recipesApi = new RecipesApi();

      await recipesApi.apiRecipesIdFavoriteDelete(payload);

      return payload;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
