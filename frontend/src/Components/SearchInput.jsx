import React, { useState, useEffect } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../zustand/useConversation';
import useGetConversation from '../Hooks/useGetConversation';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { setSelectedConversation } = useConversation(); 
  const { conversations } = useGetConversation(); 

  useEffect(() => {
    if (search.length >= 3) {
      const results = conversations.filter((c) => 
        c.fullName.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [search, conversations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters");
    }

    if (searchResults.length > 0) {
      setSelectedConversation(searchResults[0]);
      setSearch('');
    } else {
      toast.error("No matching user found");
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-white p-2 rounded-full shadow-sm">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button 
          type="submit" 
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          disabled={search.length < 3}
        >
          <IoSearchSharp className="text-lg" />
        </button>
      </form>

      {/* Search results dropdown */}
      {search.length >= 3 && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {searchResults.map((user) => (
            <div
              key={user._id}
              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
              onClick={() => {
                setSelectedConversation(user);
                setSearch('');
              }}
            >
              <img 
                src={user.profilePicture || '/default-avatar.png'} 
                alt={user.fullName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium">{user.fullName}</span>
            </div>
          ))}
        </div>
      )}

      {search.length >= 3 && searchResults.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white p-3 text-gray-500 border border-gray-200 rounded-lg">
          No users found
        </div>
      )}
    </div>
  );
};

export default SearchInput;