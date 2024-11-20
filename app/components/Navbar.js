"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ShoppingCartIcon as LuShoppingCart,
  HeartIcon as LuHeart,
  UserIcon as LuUser,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import categories from the JSON file
import categories from "../../data/category.json";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "@/utlis/cartUtlis";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = getCurrentUserId(); // Fetch userId
    setUserId(user);
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }
   
  }, []);
  const cartItems = useSelector((state) => state.cart.items[userId] || []);
  const itemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <nav className="bg-white shadow-md transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              Logo
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-1">
            {categories.map((category) => (
              <DropdownMenu key={category.id}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    {category.name}{" "}
                    <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-1">
                  {category.subCat.map((subcategory) => (
                    <DropdownMenuItem
                      key={subcategory.id}
                      className="hover:bg-gray-100 rounded-md"
                    >
                      <Link
                        href={`/category/${category.slug}?subcat=${subcategory.slug}`}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                      >
                        {subcategory.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>

          {/* Login/Signup Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  href={"/cart"}
                  as={"/cart"}
                  legacyBehavior
                  passHref
                  className=" text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  <div className="relative">
                    <LuShoppingCart className="h-6 w-6" />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </div>
                </Link>
                <Link
                  href={"/wishlist"}
                  as={"/wishlist"}
                  legacyBehavior
                  passHref
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  <LuHeart className="h-6 w-6" />
                </Link>
                <Link
                  href={"/my-profile"}
                  as={"/my-profile"}
                  legacyBehavior
                  passHrefclassName="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  <LuUser className="h-6 w-6" />
                </Link>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                >
                  <Link href={"/login"} as={"/login"} legacyBehavior passHref>
                          Login
                  </Link>
                </Button>
                <Button className="bg-primary text-white hover:bg-primary-dark transition-colors duration-200">
                  <Link
                    href={"/sign-up"}
                    as={"/sign-up"}
                    legacyBehavior
                    passHref
                  >
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {categories.map((category) => (
              <div key={category.id} className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-between text-left text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.name}
                  {expandedCategory === category.id ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </Button>
                {expandedCategory === category.id && (
                  <div className="pl-4 space-y-1">
                    {category.subCat.map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        href={`/category/${category.slug}?subcat=${subcategory.slug}`}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-around px-5">
              {isLoggedIn ? (
                <>
                  <Link
                    href={"/cart"}
                    as={"/cart"}
                    legacyBehavior
                    passHrefclassName=" text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    <div className="relative">
                      <LuShoppingCart className="h-6 w-6" />
                      {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {itemCount}
                        </span>
                      )}
                    </div>
                  </Link>
                  <Link
                    href={"/wishlist"}
                    as={"/wishlist"}
                    legacyBehavior
                    passHref
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    <LuHeart className="h-6 w-6" />
                  </Link>
                  <Link
                    href={"/my-profile"}
                    as={"/my-profile"}
                    legacyBehavior
                    passHrefclassName="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    <LuUser className="h-6 w-6" />
                  </Link>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Link
                      href={"/login"}
                      as={"/login"}
                      legacyBehavior
                      passHref
                    ></Link>
                    Login
                  </Button>
                  <Button className="bg-primary text-white hover:bg-primary-dark transition-colors duration-200">
                    <Link
                      href={"/sign-up"}
                      as={"/sign-up"}
                      legacyBehavior
                      passHref
                    >
                   
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
