'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProfileForm from '../components/ProfileForm'
import Sidebar from '../components/Sidebar'

export default function Profile() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({ username: '', email: '' })
  const [isLoading, setIsLoading] = useState(true); // For managing loading state
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      setCurrentUser(user);
    } else {
      router.push('/'); // Redirect to login if not logged in
    }
    setIsLoading(false); // Set loading to false after check
  }, [router]);

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <p className="text-xl text-center text-gray-700">You are logged out. Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-24 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Your Profile</h1> */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="md:flex">
            <div className="md:w-1/3">
              <Sidebar />
            </div>
            <div className="md:w-2/3 p-6">
              {/* <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Profile Information</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-600"><span className="font-medium">Username:</span> {currentUser.username}</p>
                  <p className="text-gray-600 mt-2"><span className="font-medium">Email:</span> {currentUser.email}</p>
                </div>
              </div> */}
              <div>
              
                <ProfileForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}