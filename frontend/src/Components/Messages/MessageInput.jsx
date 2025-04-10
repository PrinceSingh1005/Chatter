import React from 'react'
import { BsSend } from "react-icons/bs";
const MessageInput = () => {
  return (
    <div>
        <form className='flex items-center justify-between bg-white border-t p-1'>
            <div className='px-2 my-1 flex items-center justify-between w-full gap-2 rounded-3xl'>
                <input type="text" placeholder='Type a message...' className='w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500' />
                <button type='submit' className='bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700'>
                    <BsSend />
                </button>
            </div>
        </form>
    </div>
  )
}

export default MessageInput