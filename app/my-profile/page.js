'use client'
import React,{useState} from 'react'
import { useRouter } from 'next/navigation';
export default function Profile() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        router.push('/')
      };
  return (
    <div className='mt-24'>
        <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block text-gray-700 px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
    </div>
  )
}
