import React from "react";
import products from "../../../data/product.json";
import Banner from "../../../data/banner.json";
import { FaRegHeart, FaAngleRight } from "react-icons/fa";
import Image from "next/image"; // Assuming you'll use Image later if needed
import Link from "next/link";
const CategoryPage = ({ params }) => {
  const { slug } = params;
    const categoryProducts = products.filter(
    (product) => product.category_slug === slug
  );
  const catBanner = Banner.filter((banner) => banner.category_slug === slug);
  if (catBanner.length === 0) {
    return <div>No Catabnner found for this category.</div>;
  }
  if (categoryProducts.length === 0) {
    return <div>No products found for this category.</div>;
  }
  console.log(catBanner);
  return (
    <div className="container mx-auto p-4">
      {catBanner.length > 0 && (
        <div className="w-full mb-14 ">
          <Image
            src={catBanner[0].bannerImg} // Use the first banner image
            alt={`Banner for ${slug}`} // Alt text should describe the category
            width={1440}
            height={120}
            priority={true}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      {/* Product Grid */}
      <div className=" grid lg:grid-cols-4 md:grid-cols-3   gap-10 md:px-4 px-1  items-center">
        {categoryProducts.map((product) => (
          <div
            key={product.id}
            className="relative n bg-white rounded-lg shadow-lg "
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
                {product.discount}% OFF
              </div>

              <button className="absolute top-0 right-0 m-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300">
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
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-5 justify-center items-center">
        {categoryProducts.map((product) => (
          <div key={product.id} className="border flex flex-col items-center rounded-lg bg-slate-100">
            
            <div className="image">
              {product.thumbnail_image && (
                <Image
                  src={product.thumbnail_image}
                  alt={product.title}
                  width={220}
                  height={320}
                />
              )}
            </div>
            <div>
              <h3>{product.title}</h3>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default CategoryPage;
