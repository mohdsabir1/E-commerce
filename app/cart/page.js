"use client";
import { getCurrentUserId } from "@/utlis/cartUtlis";
import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { Toast } from "../components/Toast";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import { useState, useEffect } from "react";
import { removeFromCart, updateQuantity } from "@/redux/cartSlice";
import CheckoutForm from "../components/Form";
export default function CartPage() {
  const dispatch = useDispatch();
  const userId = getCurrentUserId();

  useCart(userId);
  const { message, type } = useSelector((state) => state.cart);
  const [toast, setToast] = useState({ message: "", type: "" });
  const cartItems = useSelector((state) => state.cart.items[userId] || []);

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ userId, productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart({ userId, productId }));
    setToast({
      message: "Item removed successfully",
      type: "success",
    });
  };
  useEffect(() => {
    if (message && type) {
      // Set the toast message and type from Redux
      setToast({ message, type });

      // Automatically close the toast after 3 seconds
      const toastTimer = setTimeout(() => {
        setToast({ message: "", type: "" }); // Clear toast after a delay
      }, 3000);

      // Cleanup the timer when the component unmounts or the message changes
      return () => clearTimeout(toastTimer);
    }
  }, [message, type]);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const closeToast = () => {
    setToast({ message: "", type: "" }); // Close toast manually
  };

  return (
    <div className="container mx-auto p-4 mt-24">
     

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
         <div className="md:w-1/2 flex justify-between items-center mb-4">
        <h1 className="text-lg md:text-2xl font-bold ">Shopping Cart</h1>
        <div className=" text-lg md:text-xl font-bold">
          Total: ${total.toFixed(2)}
        </div>
      </div>
          <div className="md:grid md:grid-cols-12 gap-10">
            <div className="col-span-6">
              <div className="space-y-4 ">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
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
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 border rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
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
            </div>
            <div className="col-span-6">
              <CheckoutForm />
            </div>
          </div>
        </>
      )}
      {toast.message && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
    </div>
  );
}
