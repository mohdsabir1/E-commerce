'use client'
import React,{useState,useEffect} from 'react'
import { getCurrentUserId } from '@/utlis/cartUtlis'

import { useRouter } from 'next/navigation';
export default function Sidebar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false); // Update the state to trigger re-render
       // Redirect to home or login page
        window.location.reload();
         router.push('/'); 
      };
      useEffect(() => {
        const loginStatus = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loginStatus === 'true');
      }, []);
    const userId = getCurrentUserId()
    const displayName = JSON.parse(localStorage.getItem('currentUser'));
  // Add your sidebar logic here
  console.log("user Id",displayName.username,displayName.email)
  return (
    <div>
      <h1 className='text-4xl font-semibold'>Account</h1>
      <div>
        <p>Welcome {displayName.username}</p>
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
  )
}
