'use client'
import { getCurrentUserId } from '@/utlis/cartUtlis';
import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, updateQuantity } from '../store/cartSlice';

import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import { removeFromCart, updateQuantity } from '@/redux/cartSlice';
export default function CartPage() {
  const dispatch = useDispatch();
  const userId = getCurrentUserId();
  useCart(userId);
  const cartItems = useSelector((state) => state.cart.items[userId] || []);
  console.log("the cart list",cartItems)

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ userId, productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart({ userId, productId }));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.thumbnail_image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="text-xl font-bold">
              Total: ${total.toFixed(2)}
            </div>
            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}