import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  addRecipeToFavorite,
  fetchRecipes,
  removeRecipeFromFavorite,
} from './recipesOps.js';

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = '';
    });

    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });

    builder.addCase(fetchRecipes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });

    builder.addCase(addRecipeToFavorite.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = '';
    });

    builder.addCase(addRecipeToFavorite.fulfilled, (state, action) => {
      state.isLoading = false;

      const recipeId = String(action.payload);

      const results = state.items.results.map((r) =>
        String(r.id) === recipeId ? { ...r, isFavorite: true } : r
      );

      state.items = { ...state.items, results };
    });

    builder.addCase(addRecipeToFavorite.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });

    builder.addCase(removeRecipeFromFavorite.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = '';
    });

    builder.addCase(removeRecipeFromFavorite.fulfilled, (state, action) => {
      state.isLoading = false;

      const recipeId = String(action.payload);

      const results = state.items.results.map((r) =>
        String(r.id) === recipeId ? { ...r, isFavorite: false } : r
      );

      state.items = { ...state.items, results };
    });

    builder.addCase(removeRecipeFromFavorite.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });
  },
});

export default recipesSlice.reducer;

export const selectRecipes = (state) => {
  return state.recipes.items;
};
export const selectRecipesFilters = createSelector(
  [(state) => state.filters, (state) => state.categories],
  (filters, categories) => ({
    ...filters.savedFilters,
    categoryid: categories.selectedCategory,
  })
);