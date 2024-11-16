'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileForm from '../components/ProfileForm'
export default function Profile() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check the login status when the component mounts
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true');
  }, []);

  // Handle logout by clearing the localStorage and updating the state
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false); // Update the state to trigger re-render
    router.push('/'); // Redirect to home or login page
  };

  if (!isLoggedIn) {
    return (
      <div className="mt-24">
        <p>You are logged out. Redirecting...</p>
        {/* Optionally, show a message and redirect */}
      </div>
    );
  }

  return (
    <div className="mt-24">
      <div className='text-center '>
        <h1 className='text-4xl font-semibold '>Profile</h1>
      <ProfileForm />
      </div>
   
      <button
        onClick={() => {
          handleLogout();
        }}
        className="block text-gray-700 px-3 py-2 rounded-md text-base font-medium"
      >
        Logout
      </button>
    </div>
  );
}
