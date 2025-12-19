import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './categoriesOps.js';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    selectedCategory: null,
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    unselectCategory: (state) => {
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = '';
    });

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = [
        ...action.payload.slice(0, 11),
        {
          id: 'all',
          name: 'All categories',
        },
      ];
    });

    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });
  },
});

export default categoriesSlice.reducer;

export const { selectCategory, unselectCategory } = categoriesSlice.actions;

export const selectCategories = (state) => state.categories.items;
export const selectSelectedCategory = createSelector(
  [(state) => state.categories],
  (categories) => categories.items.find((item) => item.id === categories.selectedCategory)
)
