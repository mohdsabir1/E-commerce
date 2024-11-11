import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistSlice from './wishlistSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist:wishlistSlice
  },
});