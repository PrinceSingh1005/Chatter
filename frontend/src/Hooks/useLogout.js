import React, { useState } from 'react'
import axios from '../api/axios.js'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext.jsx'

const useLogout = () => {
  const [loading,setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
        const {data} = await axios.post(
          "/auth/logout",
          {},
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true // Include cookies in the request
          }
        );

        if (data.error) throw new Error(data.error);

      localStorage.removeItem('chat-user');
      setAuthUser(null);
      toast.success("Logout successful!");
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error(error.message || "Logout failed. Please try again.");
    } finally{
        setLoading(false);

    }
  };
  return {loading, logout};
}

export default useLogout