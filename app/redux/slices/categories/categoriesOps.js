import { createAsyncThunk } from '@reduxjs/toolkit';
import { CategoriesApi } from '../../../api-client/src/index.js';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const testimonialsApi = new CategoriesApi();

      const { response } = await testimonialsApi.apiCategoriesGetWithHttpInfo();

      return response.body;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
