import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserCart } from '@/redux/cartSlice';
import { setWishlist } from '@/redux/wishlistSlice';
// import { setCheckout } from '@/redux/checkoutSlice';


import { getCurrentUserId, loadUserCart, loadUserWishlist, loadChecklist, loadProfile} from '@/utlis/cartUtlis';

import { setProfile } from '@/redux/profileSlice';
import { setCheckutItems } from '@/redux/checkoutSlice';


// import { getCurrentUserId, loadUserCart, loadUserWishlist, loadChecklist, loadProfile } from '@/utils/cartUtlis'; // Updated import

// useCart hook
export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      try {
        const userCart = loadUserCart(userId);
        dispatch(setUserCart({ userId, items: userCart }));
      } catch (error) {
        console.error("Error loading user cart:", error);
      }
    }
  }, [dispatch]);

  return cart;
};

// useWishlist hook
export const useWishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      try {
        const userWishlist = loadUserWishlist(userId);
        dispatch(setWishlist({ userId, items: userWishlist }));
      } catch (error) {
        console.error("Error loading user wishlist:", error);
      }
    }
  }, [dispatch]);

  return wishlist;
};
// useProfile hook
export const useProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      try {
        const userProfile = loadProfile(userId);
        dispatch(setProfile({ userId, items: userProfile }));
      } catch (error) {
        console.error("Error loading user profile:", error);
       
      }
    }
  }, [dispatch]);

  return profile;
};
export const checkout = () => {
  const dispatch = useDispatch();
  const checkout = useSelector((state) => state.checkout);

  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      try {
        const userCheckout = loadChecklist(userId);
        dispatch(setCheckutItems({ userId, items: userCheckout }));
      } catch (error) {
        console.error("Error loading user userCheckout:", error);
       
      }
    }
  }, [dispatch]);

  return checkout;
};

// useCheckout hook
// useCheckout hook




