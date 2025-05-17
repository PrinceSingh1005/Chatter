import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import Conversations from "./conversation/Conversations";
import Logout from "./Logout";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

export default function ChatSidebar() {
  const { authUser } = useAuthContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full md:w-1/4 bg-white border-r overflow-y-auto h-screen flex flex-col relative">
      {/* Header with app name and profile photo */}
      <div className="flex items-center justify-between p-4 border-b">
        <img className="w-12 h-12 rounded-full object-cover cursor-pointer hover:border-blue-600 transition" src="chatter.png" alt="Logo" />
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src={authUser.profilePicture || '/default-avatar.png'}
              alt={authUser.fullName}
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 cursor-pointer hover:border-blue-600 transition"
            />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile Page
              </Link>
              <div className="border-t border-gray-200"></div>
              <Logout className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" />
            </div>
          )}
        </div>
      </div>

      {/* Search input */}
      <div className="p-2 border-b">
        <SearchInput />
      </div>

      {/* Conversations list - takes remaining space */}
      <div className="flex-1 overflow-y-auto">
        <Conversations />
      </div>
    </div>
  );
}