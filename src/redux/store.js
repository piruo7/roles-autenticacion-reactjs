import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './authSlice';

export const store = configureStore( {
  reducer: {
    users: usersSlice,
  },
} );
