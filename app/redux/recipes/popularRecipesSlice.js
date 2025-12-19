import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const popularRecipesSlice = createSlice({
  name: 'popularRecipes',
  initialState,
  reducers: {
    fetchStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchError(state, action) {
      state.isLoading = false;
      state.error = action.payload || 'Failed to load popular recipes';
    },
    clearPopularRecipes(state) {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError, clearPopularRecipes } =
  popularRecipesSlice.actions;

const popularRecipesReducer = popularRecipesSlice.reducer;

export default popularRecipesReducer;

// selectors
export const selectPopularRecipes = (state) => state.popularRecipes.data;
export const selectPopularRecipesLoading = (state) =>
  state.popularRecipes.isLoading;
export const selectPopularRecipesError = (state) => state.popularRecipes.error;
