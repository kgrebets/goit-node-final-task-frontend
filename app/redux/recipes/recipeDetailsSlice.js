import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const recipeDetailsSlice = createSlice({
  name: 'recipeDetails',
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
      state.error = action.payload || 'Failed to load recipe details';
    },
    clearRecipeDetails(state) {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError, clearRecipeDetails } =
  recipeDetailsSlice.actions;

const recipeDetailsReducer = recipeDetailsSlice.reducer;

export default recipeDetailsReducer;

export const selectRecipeDetails = (state) => state.recipeDetails.data;
export const selectRecipeDetailsLoading = (state) =>
  state.recipeDetails.isLoading;
export const selectRecipeDetailsError = (state) => state.recipeDetails.error;
