"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import categories from "../../data/category.json";
import { LuShoppingCart, LuHeart, LuUser } from "react-icons/lu";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "@/utlis/cartUtlis";
import { useSearchParams } from "next/navigation";

export default function Navbar() {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = getCurrentUserId(); // Fetch userId
    setUserId(user);
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  // Make sure userId is available before using useSelector
  const cartItems = useSelector((state) => state.cart.items[userId] || []);

  const itemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  if (!categories || categories.length === 0) {
    return <div>Loading categories...</div>;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); // Track active category for dropdown

  // Toggle dropdown for category
  const toggleDropdown = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <nav
      className={`fixed w-full z-10 top-0 left-0 transition-all duration-300 ease-in-out bg-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="">
              <Image
                src="/img/logo.webp"
                alt="logo"
                width={50}
                height={50}
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 ml-10">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => toggleDropdown(cat.id)} // Hover to show subcategories
                onMouseLeave={() => toggleDropdown(null)} // Hide subcategories when hover ends
              >
                <Link
                  href={`/category/${cat.slug}`}
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out"
                >
                  {cat.name}
                </Link>

                {/* Dropdown for Subcategories */}
                {activeCategory === cat.id && (
                  <div className="absolute left-0 top-5 w-48 mt-2 bg-white shadow-lg rounded-md overflow-hidden z-10">
                    {cat.subCat.map((subCat) => (
                      <Link
                        key={subCat.id}
                        href={`/category/${cat.slug}?subcat=${subCat.slug}`}
                        className="block text-gray-700 hover:text-indigo-600 px-4 py-2 text-sm transition-all duration-300 ease-in-out"
                      >
                        {subCat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* User Account / Login Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/cart"
                  className="block text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 mx-2 "
                >
                  <div className="relative py-2">
                    {itemCount > 0 && (
                      <div className="bottom-3 absolute left-4">
                        <p className="flex h-2 w-3 items-center justify-center rounded-full bg-gray-800 p-2 text-xs text-white">
                          {itemCount}
                        </p>
                      </div>
                    )}
                    <LuShoppingCart />
                  </div>
                </Link>
                <Link
                  href="/wishlist"
                  className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 mx-2"
                >
                  <LuHeart />
                </Link>
                <Link
                  href="/my-profile"
                  className="block text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 "
                >
                  <LuUser />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-gray-200 text-black px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out hover:bg-gray-300 hover:shadow-md transform hover:-translate-y-0.5"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out hover:bg-gray-700 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-300 ease-in-out"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md absolute left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 space-y-4">
          {categories.map((cat) => (
            <div key={cat.id}>
              <Link
                href={`/category/${cat.slug}`}
                className="block text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ease-in-out"
                onClick={() => setIsOpen(false)}
              >
                {cat.name}
              </Link>

              {/* Dropdown for Mobile (Subcategories) */}
              <div className="space-y-2 pl-4">
                {cat.subCat.map((subCat) => (
                  <Link
                    key={subCat.id}
                    href={`/category/${cat.slug}?subcat=${subCat.slug}`}
                    className="block text-gray-700 hover:text-indigo-600 px-4 py-2 text-sm transition-all duration-300 ease-in-out"
                    onClick={() => setIsOpen(false)}
                  >
                    {subCat.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
