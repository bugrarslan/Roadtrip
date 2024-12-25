import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tripReducer from './slices/tripSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    trip: tripReducer,
  },
});

export default store;
