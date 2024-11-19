'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCurrentUserId } from '@/utlis/cartUtlis'
import { User, Settings, ShoppingBag, CreditCard, HelpCircle, LogOut } from 'lucide-react'

export default function Sidebar() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({ username: '', email: '' })

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn')
    setIsLoggedIn(loginStatus === 'true')
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
    setCurrentUser(user)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('currentUser')
    router.push('/')
    window.location.reload()
    setIsLoggedIn(false)
    
   
  }

  const userId = getCurrentUserId()

  const menuItems = [
    // { icon: User, text: 'Profile', href: '/profile' },
    { icon: ShoppingBag, text: 'Orders', href: '/orders' },
    // { icon: CreditCard, text: 'Billing', href: '/billing' },
    // { icon: Settings, text: 'Settings', href: '/settings' },
    // { icon: HelpCircle, text: 'Help', href: '/help' },
  ]

  return (
    <div className="w-full md:w-64 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6 text-center">
        <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
          <img
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${currentUser.username}`}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Welcome, {currentUser.username}</h2>
        <p className="text-sm text-gray-600 mt-1">{currentUser.email}</p>
      </div>
      <nav className="mt-6">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  )
}