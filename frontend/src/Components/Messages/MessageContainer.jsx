import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import {TiMessages} from "react-icons/ti";

const MessageContainer = () => {
    const noChatSelected = true; // This should be replaced with actual logic to check if a chat is selected
  return (
    <div className="flex-1 flex flex-col">
        {noChatSelected ? <NoChatSelected /> : (
            <>
        <div className='bg-blue-300 h-20 flex items-center justify-between px-4'>
            <h1 className='text-xl font-semibold'>John Doe</h1>
            <span className='text-2xl'>😊</span>
        </div>
        <Messages />
        <MessageInput />
        </>
        )}
    </div>
  )
}

export default MessageContainer;

const NoChatSelected = () => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 Prince ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

