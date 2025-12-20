import { createSlice } from '@reduxjs/toolkit';
import { fetchTestimonials } from './testimonialsOps.js';

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState: {
    items: [],
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTestimonials.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = '';
    });

    builder.addCase(fetchTestimonials.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });

    builder.addCase(fetchTestimonials.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });
  },
});

export default testimonialsSlice.reducer;

export const selectTestimonials = (state) => state.testimonials.items;
