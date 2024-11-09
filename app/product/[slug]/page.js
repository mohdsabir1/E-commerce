'use client'
import React, { use } from "react";
import products from "../../../data/product.json";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { getCurrentUserId } from "@/utlis/cartUtlis";
import { FaArrowUp ,FaArrowDown } from "react-icons/fa";
export default function ProductDetail({ params }) {
  // Unwrap the params using React.use()
  const dispatch = useDispatch();
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;
  const product = products.find((product) => product.slug === slug);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openSpecs, setOpenSpecs] = useState({}); 
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);


const handleAddToCart = () => {
    if (isLoggedIn) {
      const userId = getCurrentUserId();
      if (userId) {
        dispatch(addToCart({
          userId,
          product: {
            id: product.id,
            title: product.title,
            price: product.offer_price,
            thumbnail_image: product.thumbnail_image
          }
        }));
        alert("Item added to the cart!");
      }
    } else {
      alert('Please sign in first');
    }
  };

  const toggleSpec = (key) => {
    setOpenSpecs((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-24">
      <div className="grid grid-cols-12 marker:items-center">
        <div className="w-full  col-span-12 md:col-span-6">
          <div>
            <Image
              src={product.thumbnail_image}
              alt={product.title}
              width={300}
              height={100}
              priority={true}
              className="w-96 h-fit"
            />
          </div>

          {/* <div className="col-span-6">
            <p>helllo</p>
            <p>helllo</p>
            <p>helllo</p>
            <p>helllo</p>
          </div> */}
        </div>

        <div className="col-span-12 md:col-span-6 ">
          <h1 className="md:text-3xl text-xl font-bold text-gray-900">{product.title}</h1>
          <p className="md:text-lg text-sm text-gray-700 mt-2">
            {product.short_description}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-xl font-bold text-gray-900">
                ${product.offer_price.toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-green-600 font-semibold">
              {product.discount}% OFF
            </div>
          </div>

          <div className="mt-6 md:flex md:flex-row flex flex-col gap-5 items-center justify-between">
            <button 
              onClick={handleAddToCart}
              className="w-full md:w-48 px-3 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-300"
            >
              Add to Cart
            </button>
            <button className="w-full md:w-48 px-3 py-3 bg-gray-100 text-black rounded-md hover:bg-gray-300 transition-colors duration-300">
              Buy Now
            </button>
          </div>
          
          <div className="mt-6 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-gray-800">Features:</h2>
            <ul className="list-disc pl-6 mt-2">
              {product.features?.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 w-full ">
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Specifications:
        </h2>
        <div className="space-y-2 mt-2">
          {product.specifications &&
            Object.entries(product.specifications).map(([key, value], index) => (
              <div key={index} className="border-b">
                <button
                  onClick={() => toggleSpec(key)}
                  className="w-full flex justify-between items-center py-3 px-4 text-left text-lg font-medium text-gray-800 focus:outline-none hover:bg-gray-100"
                >
                  <span>{key}</span>
                  <span className="text-sm text-gray-500">
                    {openSpecs[key] ? <FaArrowUp /> : <FaArrowDown />}
                  </span>
                </button>
                {openSpecs[key] && (
                  <div className="py-2 px-4 bg-gray-50">
                    <span className="text-gray-600">{value}</span>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}