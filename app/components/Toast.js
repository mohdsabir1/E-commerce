'use client'
import { useEffect } from 'react';

export function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-dismiss after 3 seconds
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 max-w-xs w-full rounded-md shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white font-medium`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white">
          &times;
        </button>
      </div>
    </div>
  );
}
