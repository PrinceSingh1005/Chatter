import React from 'react';
import { SlLogout } from "react-icons/sl";
import useLogout from '../Hooks/useLogout.js';
import toast from 'react-hot-toast';

const Logout = () => {
  const { loading, logout } = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      toast.error(error.message || 'Failed to logout');
    }
  };

  return (
    <div className="group bottom-0">
      {/* Button */}
      <button 
        className="p-2 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        onClick={handleLogout}
        disabled={loading}
        aria-label="Logout"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
        ) : (
          <SlLogout className="w-5 h-5 text-black hover:text-gray-300 transition-colors" />
        )}
      </button>
    </div>
  );
};

export default Logout;