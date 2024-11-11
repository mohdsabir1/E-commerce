"use client";
import { useWishlist } from "@/hooks/useCart";
import { getCurrentUserId } from "@/utlis/cartUtlis";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { removeFromWishlist } from "@/redux/wishlistSlice";
import { Toast } from "../components/Toast";
export default function Wishlist() {
  const dispatch = useDispatch();
  const userId = getCurrentUserId();
  useWishlist(userId);
  const [toast, setToast] = useState({ message: "", type: "" });
  const wishlistItems = useSelector(
    (state) => state.wishlist.items[userId] || []
  );

  const handleRemoveItem = (productId) => {
    dispatch(removeFromWishlist({ userId, productId }));
    setToast({
      message: "Item removed successfully",
      type: "success",
    });
  };
  const closeToast = () => {
    setToast({ message: "", type: "" }); // Close toast manually
  };
  // console.log("the items in the wishlist", wishlistItems);
  return (
    <>
    <div className="mt-24">
    <div className="  grid lg:grid-cols-4 md:grid-cols-3   gap-10 md:px-4 px-1  items-center">
        {wishlistItems.map((product) => (
          <div
            key={product.id}
            className="relative n bg-white rounded-lg shadow-lg border "
          >
            <div className="relative h-64 flex flex-col justify-center items-center">
              <Image
                src={product.thumbnail_image}
                alt={product.title}
                width={220}
                height={220}
                priority={true}
                className=" cursor-pointer  hover:opacity-75 transition-transform duration-300 hover:scale-105"
              />

              <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-bold">
                {product.price}
              </div>

              <button className="absolute top-0 right-0 m-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300">
                {/* <FaRegHeart
                onClick={() => handleAddToWishlist(product)}
                  className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors duration-300"
                /> */}
                <MdCancel onClick={() => handleRemoveItem(product.id)} />
              </button>
            </div>

            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 h-14">
                {product.title}
              </h3>

              {/* <div className="flex flex-col space-y-2">
                <button className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-300">
                  Add to Cart
                </button>

                <Link
                  href={`/product/${product.slug}`}
                  as={`/product/${product.slug}`}
                  passHref
                  legacyBehavior
                >
                  <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center">
                    Check
                    <FaAngleRight className="w-4 h-4 ml-1" />
                  </button>
                </Link>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
    {toast.message && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
    </>
  );
}
