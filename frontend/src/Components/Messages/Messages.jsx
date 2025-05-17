import React, { useRef, useEffect } from 'react'
import Message from './Message'
import useGetMessages from '../../Hooks/useGetMessages';
import MessageSkeleton from '../Skeletons/MessageSkeleton';
import useListenMessages from '../../Hooks/useListenMessages';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() =>{
      lastMessageRef.current?.scrollIntoView({behavior: "smooth"});
    },100)
  },[messages])

  return (
    <div className='md:min-w-full md:max-w-full md:h-full bg-white border-l overflow-auto py-2 px-2'>
      {!loading && messages.length > 0 && messages.map((message) => (
        <div 
        key={message._id} 
        ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}
      {/* Loading skeletons */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className='text-conter text-black'>Send a message to start the conversation</p>
      )}

    </div>
  )
}

export default Messages