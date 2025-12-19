import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import recipeDetailsReducer from './recipes/recipeDetailsSlice';
import popularRecipesReducer from './recipes/popularRecipesSlice';

const persistorConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  recipeDetails: recipeDetailsReducer,
  popularRecipes: popularRecipesReducer,
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
