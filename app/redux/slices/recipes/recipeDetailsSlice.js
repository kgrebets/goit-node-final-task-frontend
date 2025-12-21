import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipeDetails } from './recipeDetailsOps.js';
import { addRecipeToFavorite, removeRecipeFromFavorite } from './recipesOps.js';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const recipeDetailsSlice = createSlice({
  name: 'recipeDetails',
  initialState,
  reducers: {
    clearRecipeDetails(state) {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipeDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to load recipe details';
      })

      .addCase(addRecipeToFavorite.fulfilled, (state, action) => {
        const id = String(action.payload);
        if (String(state.data?.id) === id) {
          state.data = { ...state.data, isFavorite: true };
        }
      })
      .addCase(removeRecipeFromFavorite.fulfilled, (state, action) => {
        const id = String(action.payload);
        if (String(state.data?.id) === id) {
          state.data = { ...state.data, isFavorite: false };
        }
      });
  },
});

export const { clearRecipeDetails } = recipeDetailsSlice.actions;

export default recipeDetailsSlice.reducer;

export const selectRecipeDetails = (state) => state.recipeDetails.data;
export const selectRecipeDetailsLoading = (state) =>
  state.recipeDetails.isLoading;
export const selectRecipeDetailsError = (state) => state.recipeDetails.error;
