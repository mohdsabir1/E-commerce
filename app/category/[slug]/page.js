'use client';
import React, { useState, useEffect } from "react";
import products from "../../../data/product.json";
import categories from "../../../data/category.json";
import Banner from "../../../data/banner.json";
import { FaRegHeart, FaAngleRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { getCurrentUserId } from "@/utlis/cartUtlis";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "@/app/components/Toast";
import { addWishlist } from "@/redux/wishlistSlice";
import { useSearchParams } from 'next/navigation';

const CategoryPage = ({ params }) => {
  const dispatch = useDispatch();
  const { slug } = React.use(params);
  const searchParams = useSearchParams();
  const subCategorySlug = searchParams.get('subcat');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [activeSubCategory, setActiveSubCategory] = useState(subCategorySlug || 'all');
  const { message, type } = useSelector((state) => state.wishlist);

  // Get current category and its subcategories
  const currentCategory = categories.find(cat => cat.slug === slug);
  const subCategories = currentCategory?.subCat || [];

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  // Filter products based on category and subcategory
  const filteredProducts = products.filter((product) => {
    const categoryMatch = product.category_slug === slug;
    if (activeSubCategory === 'all') {
      return categoryMatch;
    }
    return categoryMatch && product.subCategory_slug === activeSubCategory;
  });

  const catBanner = Banner.filter((banner) => banner.category_slug === slug);

  const handleAddToWishlist = (product) => {
    if (isLoggedIn) {
      const userId = getCurrentUserId();
      if (userId) {
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
      setToast({ message: "Please sign in first", type: "error" });
    }
  };

  const closeToast = () => {
    setToast({ message: "", type: "" });
  };

  if (catBanner.length === 0 && filteredProducts.length === 0) {
    return <div className="container mx-auto p-4 mt-16">No products found for this category.</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-16">
      {catBanner.length > 0 && (
        <div className="w-full mb-8">
          <Image
            src={catBanner[0].bannerImg}
            alt={`Banner for ${slug}`}
            width={1440}
            height={120}
            priority={true}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Subcategory Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setActiveSubCategory('all')}
            className={`px-4 py-2 rounded-md transition-colors duration-300 ${
              activeSubCategory === 'all'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            All Products
          </button>
          {subCategories.map((subCat) => (
            <button
              key={subCat.id}
              onClick={() => setActiveSubCategory(subCat.slug)}
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                activeSubCategory === subCat.slug
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {subCat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-10 md:px-4 px-1 items-center">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="relative bg-white rounded-lg shadow-lg"
          >
            <div className="relative h-64 flex flex-col justify-center items-center">
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

              <button className="absolute top-0 right-0 m-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300">
                <FaRegHeart
                  onClick={() => handleAddToWishlist(product)}
                  className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors duration-300"
                />
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
                <Link
                  href={`/product/${product.slug}`}
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

      {toast.message && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
    </div>
  );
};

export default CategoryPage;