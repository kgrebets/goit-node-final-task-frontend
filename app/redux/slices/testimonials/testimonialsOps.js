import { createAsyncThunk } from '@reduxjs/toolkit';
import { TestimonialsApi } from '../../../api-client/src/index.js';

export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchTestimonials',
  async (_, thunkAPI) => {
    try {
      const testimonialsApi = new TestimonialsApi();

      const { response } =
        await testimonialsApi.apiTestimonialsGetWithHttpInfo();

      return response.body;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
