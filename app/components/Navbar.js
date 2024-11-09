"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import categories from "../../data/category.json";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  if (!categories || categories.length === 0) {
    return <div>Loading categories...</div>;
  }

  return (
    <nav
      className={`fixed w-full z-10 top-0 left-0 transition-all duration-300 ease-in-out bg-white `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className=""
            >
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
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out
                           hover:bg-indigo-50 hover:shadow-md transform hover:-translate-y-0.5
                          `}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* User Account / Login Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="bg-gray-200 text-black px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out
                         hover:bg-gray-300 hover:shadow-md transform hover:-translate-y-0.5"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out
                         hover:bg-gray-700 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
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
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="block text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-200">
            <Link
              href="/login"
              className="block text-gray-100 hover:text-indigo-300 hover:bg-indigo-50 px-3 py-2 rounded-md transition-all duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="block bg-gray-800 text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-300 ease-in-out mt-2"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
