// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';

// const persistorConfig = {
//   key: 'root',
//   storage,
//   whitelist: []
// }

// // const rootReducer = combineReducers({
// //   name1: name1Reducer,
// //   name2: name2Reducer
// // });
// const rootReducer = combineReducers({});

// const persistedReducer = persistReducer(persistorConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// const persistor = persistStore(store);

// export { store , persistor };

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistorConfig = {
  key: 'root',
  storage,
  whitelist: []
};

// ДОБАВЛЯЮ РЕДЮСЕР
const dummyReducer = (state = {}) => state;

const rootReducer = combineReducers({
  app: dummyReducer  // Добавляю хотя бы один редюсер
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