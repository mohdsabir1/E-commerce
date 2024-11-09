import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserCart } from '../store/cartSlice';
import { getCurrentUserId, loadUserCart } from '../utils/cartUtils';

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
