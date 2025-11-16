import { configureStore } from '@reduxjs/toolkit';
import authApi from '../redux/features/auth/authApi';
import authReducer from '../redux/features/auth/authSlice';
import productsApi from './features/products/productsApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware),
});
