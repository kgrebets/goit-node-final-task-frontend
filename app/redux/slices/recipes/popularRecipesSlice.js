import { createSlice } from '@reduxjs/toolkit';
import { fetchPopularRecipes } from './popularRecipesOps.js';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const popularRecipesSlice = createSlice({
  name: 'popularRecipes',
  initialState,
  reducers: {
    clearPopularRecipes(state) {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPopularRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to load popular recipes';
      });
  },
});

export const { clearPopularRecipes } = popularRecipesSlice.actions;

export default popularRecipesSlice.reducer;

export const selectPopularRecipes = (state) => state.popularRecipes.data;
export const selectPopularRecipesLoading = (state) =>
  state.popularRecipes.isLoading;
export const selectPopularRecipesError = (state) => state.popularRecipes.error;
