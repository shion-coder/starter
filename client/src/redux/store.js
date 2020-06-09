import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import errrorsReducer from 'redux/slices/errors.slice';
import authReducer from 'redux/slices/auth.slice';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/* -------------------------------------------------------------------------- */

const rootReducer = combineReducers({
  errors: errrorsReducer,
  auth: authReducer,
});

const persistConfig = {
  storage,
  key: 'root',
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

export const persistor = persistStore(store);

export default store;
