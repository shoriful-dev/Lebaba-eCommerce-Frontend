import { configureStore } from '@reduxjs/toolkit';
import authApi from '../redux/features/auth/authApi';
import authReducer from '../redux/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware),
});
