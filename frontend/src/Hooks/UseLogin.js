import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../api/axios.js";
import { useAuthContext } from "../context/AuthContext.jsx";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;

    setLoading(true);
    try {
      const { data } = await axios.post(
        "/auth/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          // Optional: Add timeout (milliseconds)
          timeout: 5000, // Cancel request if it takes longer than 5s
        }
      );

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Logging successfully!");
    } catch (error) {
        toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors(username, password) {
  if (!username?.trim() || !password?.trim()) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}