import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../api/axios.js";
import { useAuthContext } from "../context/AuthContext.jsx";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
    if (!success) return false;

    setLoading(true);
    try {
      const { data } = await axios.post(
        "/auth/signup",
        { fullName, username, password, confirmPassword, gender },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 5000,
          withCredentials: true
        }
      );

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Account created successfully!");
      return true; // Indicate success
    } catch (error) {
      handleSignupError(error);
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  const handleSignupError = (error) => {
    let errorMessage = "Signup failed. Please try again.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;

      if (error.response?.status === 409) {
        errorMessage = "Username already exists";
      }
    }

    toast.error(errorMessage);
  };

  return { loading, signup };
};

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
  if (!fullName?.trim() || !username?.trim() || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords don't match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}

export default useSignUp;