'use client'

import { getCurrentUserId } from "@/utlis/cartUtlis"
import { useSelector, useDispatch } from "react-redux"
import { Toast } from "../components/Toast"
import { useCart, useProfile } from "@/hooks/useCart"
import Image from "next/image"
import { useState, useEffect } from "react"
import { clearCart, removeFromCart, updateQuantity } from "@/redux/cartSlice"
import { useRouter } from "next/navigation"
import { addCheckout } from "@/redux/checkoutSlice"
import Link from "next/link"
export default function CartPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const userId = getCurrentUserId()

  useCart(userId)
  useProfile(userId)
  const { message, type } = useSelector((state) => state.cart)
  const [toast, setToast] = useState({ message: "", type: "" })
  const cartItems = useSelector((state) => state.cart.items[userId] || [])
  const profileData = useSelector((state) => state.profile.items[userId] || [])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({ username: '', email: '' })
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      setCurrentUser(user);
    } else {
      router.push('/'); 
    }
    setIsLoading(false); 
  }, [router]);

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ userId, productId, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart({ userId, productId }))
    setToast({
      message: "Item removed successfully",
      type: "success",
    })
  }

  useEffect(() => {
    if (message && type) {
      setToast({ message, type })
      const toastTimer = setTimeout(() => {
        setToast({ message: "", type: "" })
      }, 3000)
      return () => clearTimeout(toastTimer)
    }
  }, [message, type])

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const closeToast = () => {
    setToast({ message: "", type: "" })
  }

  if (profileData.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        <span className="ml-2 text-lg">Loading profile data...</span>
      </div>
    )
  }

  const { name, phone, address1, address2, landmark, city, state, pincode } = profileData[0]

  const handleCheckout = () => {
    if (profileData.length > 0 && cartItems.length > 0) {
      // Dispatch the addCheckout action to save checkout data first
      dispatch(addCheckout({
        userId,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        profileData: {
          name,
          phone,
          address1,
          address2,
          landmark,
          city,
          state,
          pincode,
        },
        totalPrice: total,
      }));
  
      // Show the toast with a confirmation message (Order confirmed)
      setToast({
        message: "Order confirmed!",
        type: "success",
      });
  
      // After the toast is shown, clear the cart
      setTimeout(() => {
        dispatch(clearCart({ userId }));  // Clear the cart after checkout
        // Reload the page or navigate as needed
        // window.location.reload(); // Reload the page after clearing the cart
      }, 2000); // Delay the cart clearing to let the user see the confirmation toast
  
    } else {
      // Optionally, show a message if cart or profile data is missing
      alert('Please ensure both your cart and profile data are complete before checking out.');
    }
  };
  
  

  return (
    <div className="container mx-auto p-4 md:mt-10 lg:mt-24">
      {cartItems.length === 0 ? (
        <div className="text-center p-8 bg-white shadow-md rounded-lg">
          <p className="text-2xl font-semibold text-gray-600">Your cart is empty</p>
          <Link href={'/category/electronics'} as={'category/electronics'} legacyBehavior passHref>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Continue Shopping
          </button></Link>
       
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="md:text-xl lg:text-2xl font-bold">Shopping Cart</h2>
                <div className="md:text-md lg:text-xl font-bold">Total: ${total.toFixed(2)}</div>
              </div>
              <div className="p-4">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={item.thumbnail_image}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="object-cover rounded-md"
                        />
                        <div>
                          <h3 className="font-medium text-lg">{item.title}</h3>
                          <p className="text-gray-600">${item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <button
                            className="px-2 py-1 border rounded hover:bg-gray-200 transition-colors"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            className="px-2 py-1 border rounded hover:bg-gray-200 transition-colors"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                          onClick={() => handleRemoveItem(item.id)}
                          aria-label="Remove item"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold">Delivery Address</h2>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  <p><span className="font-semibold">Name:</span> {name}</p>
                  <p><span className="font-semibold">Phone:</span> {phone}</p>
                  <p><span className="font-semibold">Address:</span> {address1}</p>
                  {address2 && <p>{address2}</p>}
                  {landmark && <p><span className="font-semibold">Landmark:</span> {landmark}</p>}
                  <p><span className="font-semibold">City:</span> {city}</p>
                  <p><span className="font-semibold">State:</span> {state}</p>
                  <p><span className="font-semibold">Pincode:</span> {pincode}</p>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <button onClick={handleCheckout} className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {toast.message && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
    </div>
  )
}