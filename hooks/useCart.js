import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { getCurrentUserId, loadUserCart } from '../utils/cartUtils';
import { setUserCart } from '@/redux/cartSlice';
import { getCurrentUserId, loadUserCart } from '@/utlis/cartUtlis';

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
