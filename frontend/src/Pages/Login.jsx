import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../Hooks/UseLogin";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { loading, login } = useLogin();
    const { authUser } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
        if (authUser) {
            navigate("/");
        }
    };

    return (
        <div className="flex flex-col min-w-96">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-200 mx-auto mt-20">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Login to <span className="text-blue-600">Chatter</span>
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <Link
                            to="/signup"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Don't have an account? SignUp
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

// import React from 'react'

// const Login = () => {
//   return (
//     <div>Login</div>
//   )
// }

// export default Login