import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import testimonialsReducer from './slices/testimonials/testimonialsSlice';
import categoriesReducer from './slices/categories/categoriesSlice.js';
import recipesReducer from './slices/recipes/recipesSlice.js';
import filtersReducer from './slices/filters/filtersSlice.js';

const persistorConfig = {
  key: 'root',
  storage,
  whitelist: ['categories'],
};

const rootReducer = combineReducers({
  testimonials: testimonialsReducer,
  categories: categoriesReducer,
  recipes: recipesReducer,
  filters: filtersReducer,
});

const persistedReducer = persistReducer(persistorConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };