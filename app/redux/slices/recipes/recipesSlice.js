import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchRecipes } from './recipesOps.js';

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
  }
});

export default recipesSlice.reducer;

export const selectRecipes = (state) => {
  return state.recipes.items
};
export const selectRecipesFilters = createSelector(
  [(state) => state.filters, (state) => state.categories],
  (filters, categories) => ({
    ...filters.savedFilters,
    categoryid: categories.selectedCategory,
  })
);