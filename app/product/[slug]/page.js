// /app/product/[slug]/page.js

import React from "react";
import products from "../../../data/product.json"; // Your product data
import Image from "next/image";
export default function ProductDetail({ params }) {
  const { slug } = params; // Get the slug from the URL
  const product = products.find((product) => product.slug === slug); // Find the product by slug

  // Handle case where the product isn't found
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Product Image */}
      <div className="grid grid-cols-12  marker:items-center">
        <div className="w-full  col-span-6 ">
          <div className="">
            <Image
              src={product.thumbnail_image}
              alt={product.title}
              width={300}
              height={300}
              priority={true}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="col-span-6">
            <p>helllo</p>
            <p>helllo</p>
            <p>helllo</p>
            <p>helllo</p>
          </div>
        </div>

        {/* Product Details */}
        <div className="col-span-6 p-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-lg text-gray-700 mt-2">
            {product.short_description}
          </p>

          {/* Price and Offer */}
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

          {/* Add to Cart Button */}
          <div className="mt-6 flex items-center justify-between ">
            <button className="w-48 px-3 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-300">
              Add to Cart
            </button>
            <button className="w-48  px-3 py-3 bg-gray-100 text-black rounded-md hover:bg-gray-300 transition-colors duration-300">
              Buy Now
            </button>
          </div>
          <div className="mt-6 flex flex-col  justify-center">
            <h2 className="text-2xl font-semibold text-gray-800">Features:</h2>
            <ul className="list-disc pl-6 mt-2">
              {product.features &&
                product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">
                    {feature}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product Features and Specifications */}
      <div className="mt-12 w-1/2 mx-auto">
       

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Specifications:
        </h2>
        <div className="space-y-2 mt-2">
          {product.specifications &&
            Object.entries(product.specifications).map(
              ([key, value], index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium text-gray-800">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
}
