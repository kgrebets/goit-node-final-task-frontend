import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistorConfig = {
  key: 'root',
  storage,
  whitelist: []
};

const dummyReducer = (state = {}) => state;

const rootReducer = combineReducers({
  app: dummyReducer
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

export { store , persistor };