"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegHeart, FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { addWishlist } from "@/redux/wishlistSlice";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "@/utlis/cartUtlis";
import { Toast } from "./Toast";

export default function ProductSlider({ products }) {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const { message, type } = useSelector((state) => state.wishlist);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
      if (storedIsLoggedIn) {
        setIsLoggedIn(true);
      }
    }  
   
  }, []);

  const closeToast = () => {
    setToast({ message: "", type: "" }); // Close toast manually
  };
  const handleAddToWishlist = (product) => {
    if (isLoggedIn) {
      const userId = getCurrentUserId();
      if (!userId) {
        setToast({ message: "Please Login", type: "error" });
        alert("login plese")
        return
        // alert("Item added to the cart!");
      } else{
        dispatch(
          addWishlist({
            userId,
            product: {
              id: product.id,
              title: product.title,
              offer_price: product.offer_price,
              price: product.price,
              thumbnail_image: product.thumbnail_image,
            },
          })
        );
        setToast({ message: message, type: type });
      }
    } else {
     

      setToast({ message: message, type: "error" });
      // alert('Please sign in first');
    }
  };

  return (
    <div className="w-full mt-10">
      {domLoaded && (
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative bg-white rounded-lg shadow-lg h-full">
                <div className="relative h-[220px] flex flex-col justify-center items-center">
                  <Link href={`/product/${product.slug}`} passHref>
                    <Image
                      src={product.thumbnail_image}
                      alt={product.title}
                      width={220}
                      height={220}
                      priority={true}
                      className="cursor-pointer hover:opacity-75 transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-bold">
                    {product.discount}% OFF
                  </div>
                  <button
                    className="absolute top-0 right-0 m-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
                    onClick={() => handleAddToWishlist(product)}
                  >
                    <FaRegHeart className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors duration-300" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 h-14">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        ${product.offer_price.toFixed(2)}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {/* <button className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-300">
                      Add to Cart
                    </button> */}
                    <Link href={`/product/${product.slug}`} passHref>
                      <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center">
                        Check
                        <FaAngleRight className="w-4 h-4 ml-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {toast.message && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
    </div>
  );
}
