'use client'

import { useState } from 'react'
import Link from 'next/link'
import categories from '../../data/category.json';
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  if (!categories || categories.length === 0) {
    return <div>Loading categories...</div>;
  }
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
          <Link href='/' as={'/'} passHref legacyBehavior> 
            <Image src="/img/logo.webp" alt="logo" width={50} height={50} />
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1">
          {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                as={`/category/${cat.slug}`}
               className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                passHref
                legacyBehavior
              >
                {cat.name}
              </Link>
            ))}
            
          </div>

          <div className="hidden md:flex items-center">
            <Link href="/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
            <Link href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-150 ease-in-out ml-4">Sign Up</Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                as={`/category/${cat.slug}`}
              lassName="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
                passHref
                legacyBehavior
              >
                {cat.name}
              </Link>
            ))}
           
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <Link href="/login" className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Login</Link>
              <Link href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition duration-150 ease-in-out ml-4">Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}