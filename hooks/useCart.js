import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { getCurrentUserId, loadUserCart } from '../utils/cartUtils';
import { setUserCart } from '@/redux/cartSlice';
import { getCurrentUserId, loadUserCart } from '@/utlis/cartUtlis';
import { setWishlist } from '@/redux/wishlistSlice';
export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      const userCart = loadUserCart(userId);
      dispatch(setUserCart({ userId, items: userCart }));
    }
  }, [dispatch]);

  return cart;
};
export const useWishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.cart);

  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      const userWishlist = loadUserCart(userId);
      dispatch(setWishlist({ userId, items: userWishlist }));
    }
  }, [dispatch]);

  return wishlist;
};
