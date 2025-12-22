import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import testimonialsReducer from './slices/testimonials/testimonialsSlice';
import categoriesReducer from './slices/categories/categoriesSlice.js';
import recipesReducer from './slices/recipes/recipesSlice.js';
import filtersReducer from './slices/filters/filtersSlice.js';
import recipeDetailsReducer from './slices/recipes/recipeDetailsSlice.js';
import popularRecipesReducer from './slices/recipes/popularRecipesSlice.js';
import { optionsApi } from './slices/optionsApiSlice/optionsApiSlice.js';
import { setupListeners } from '@reduxjs/toolkit/query';

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
  recipeDetails: recipeDetailsReducer,
  popularRecipes: popularRecipesReducer,
  [optionsApi.reducerPath]: optionsApi.reducer,
});

const persistedReducer = persistReducer(persistorConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(optionsApi.middleware),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
