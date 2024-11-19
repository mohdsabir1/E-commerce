"use client";
import React, { useState, useEffect } from "react";
import { checkout } from "@/hooks/useCart";
import { getCurrentUserId } from "@/utlis/cartUtlis";
import { useSelector } from "react-redux";
import Products from "../../data/product.json";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CheckoutHistory = () => {
  const router = useRouter();
  const userId = getCurrentUserId();
  checkout(userId);
  const checkoutHistory = useSelector(
    (state) => state.checkout.items[userId] || []
  );

  // Function to find product details by ID
  const getProductDetails = (productId) => {
    return Products.find((product) => product.id === productId) || null;
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: "", email: "" });
  const [isLoading, setIsLoading] = useState(true); // For managing loading state
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
      const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
      setCurrentUser(user);
    } else {
      router.push("/"); // Redirect to login if not logged in
    }
    setIsLoading(false); // Set loading to false after check
  }, [router]);
  return (
    <div className="w-full max-w-4xl mx-auto mt-24 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Order History</h1>
        </div>

        <section className="p-6">
          <div className="space-y-8">
            {checkoutHistory.map((order, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 space-y-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center border-b pb-4">
                  <h3 className="font-semibold text-gray-800">
                    Order Date: {new Date(order.date).toLocaleString()}
                  </h3>
                  <p className="font-bold text-green-600">
                    Total: ${order.totalPrice.toFixed(2)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">
                      Delivery Details
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold">{order.profileData.name}</p>
                      <p className="text-gray-600">
                        {order.profileData.address1}
                      </p>
                      {order.profileData.address2 && (
                        <p className="text-gray-600">
                          {order.profileData.address2}
                        </p>
                      )}
                      <p className="text-gray-600">
                        {order.profileData.city}, {order.profileData.state}{" "}
                        {order.profileData.pincode}
                      </p>
                      <p className="text-gray-600">
                        Phone: {order.profileData.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">
                      Ordered Items
                    </h4>
                    <div className="space-y-4 overflow-auto">
                      {order.cartItems.map((item, itemIndex) => {
                        const productDetails = getProductDetails(
                          item.productId
                        );
                        return (
                          <div
                            key={itemIndex}
                            className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg"
                          >
                            {productDetails && (
                              <div className="w-20 h-20 relative flex-shrink-0">
                                <Image
                                  src={productDetails.thumbnail_image}
                                  alt={productDetails.title}
                                  width={100}
                                  height={100}
                                  className="rounded-md h-auto w-auto"
                                />
                              </div>
                            )}
                            <div className="flex-grow">
                              <h5 className="font-medium">
                                {productDetails
                                  ? productDetails.title
                                  : `Product ID: ${item.productId}`}
                              </h5>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-gray-600">
                                  Quantity: {item.quantity}
                                </span>
                                {productDetails && (
                                  <span className="font-medium text-green-600">
                                    $
                                    {(
                                      productDetails.price * item.quantity
                                    ).toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {checkoutHistory.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl text-gray-600 font-medium">
                  No order history available
                </h3>
                <p className="text-gray-500 mt-2">
                  Your completed orders will appear here
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckoutHistory;
