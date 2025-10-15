import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { socialSlice } from './social/socialSlice';

export const store = configureStore({
  reducer: {
      auth: authSlice.reducer,
      social: socialSlice.reducer,
  },
});

