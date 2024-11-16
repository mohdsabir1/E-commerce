import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistSlice from './wishlistSlice';
import checkoutSlice from './checkoutSlice'
import profileSlice from './profileSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist:wishlistSlice,
    checkout:checkoutSlice,
    profile: profileSlice

    
  },
});