import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation';
import { IoIosArrowBack } from 'react-icons/io';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const navigate = useNavigate();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const handleProfileClick = () => {
    if (selectedConversation) {
      navigate(`/profile/${selectedConversation._id}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-800">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Chat Header */}
          <div className='bg-white dark:bg-gray-700 h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-600'>
            <div className='flex items-center gap-3'>
              <button 
                className='md:hidden text-gray-600 dark:text-gray-300'
                onClick={() => setSelectedConversation(null)}
              >
                <IoIosArrowBack size={24} />
              </button>
              
              <div 
                className='relative cursor-pointer'
                onClick={handleProfileClick}
              >
                <img
                  src={selectedConversation.profilePicture || '/default-avatar.png'}
                  alt={selectedConversation.fullName}
                  className='w-10 h-10 rounded-full object-cover border-2 border-blue-500'
                />
                <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-700'></div>
              </div>
              
              <div className='cursor-pointer' onClick={handleProfileClick}>
                <h1 className='font-semibold text-gray-800 dark:text-gray-100'>
                  {selectedConversation.fullName}
                </h1>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  Online
                </p>
              </div>
            </div>
            
            <div className='flex items-center gap-4'>
              {/* Chat actions remain unchanged */}
            </div>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  return (
    <div className='flex items-center justify-center w-full h-full bg-gray-50 dark:bg-gray-900'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 font-semibold flex flex-col items-center gap-4'>
        <div className='p-4 rounded-full bg-blue-100 dark:bg-blue-900'>
          <TiMessages className='text-4xl md:text-6xl text-blue-500 dark:text-blue-300' />
        </div>
        <p className='text-xl font-bold text-gray-800 dark:text-white'>Welcome to Chatter</p>
        <p className='max-w-md text-gray-500 dark:text-gray-400'>
          Select a conversation or start a new chat to begin messaging
        </p>
      </div>
    </div>
  );
};

export default MessageContainer;