import { createSlice } from '@reduxjs/toolkit';
import { fetchFilters } from './filtersOps.js';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    items: [],
    savedFilters: {},
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    saveFilter: (state, action) => {
      state.savedFilters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilters.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = '';
    });

    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });

    builder.addCase(fetchFilters.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });
  },
});

export default filtersSlice.reducer;

export const { saveFilter } = filtersSlice.actions;

export const selectFilters = (state) => state.filters.items;
