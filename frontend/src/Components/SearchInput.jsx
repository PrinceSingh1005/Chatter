import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
export const SearchInput = () => {
  return (
    <form className="flex items-center justify-between bg-white p-3 rounded-md shadow-md mb-4">
        <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="ml-2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700">
            <IoSearchSharp className="text-lg" />
        </button>
    </form>
  )
}
