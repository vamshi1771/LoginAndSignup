import { combineReducers, createStore } from '@reduxjs/toolkit'
import snackbarReducer from './reducers/SnackBarReducer';
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducers/userReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
  };
const rootReducer = combineReducers({
    snackbar: snackbarReducer,
    user : userReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Necessary for redux-persist
      }),
  });

  export const persistor = persistStore(store);
