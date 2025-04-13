import {useState} from 'react'
import { BsSend } from "react-icons/bs";
import useSendMessage from '../../Hooks/useSendMessage';


const MessageInput = () => {
  const [message, setMessage] = useState("");
  const {loading, sendMessage} = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  }

  
  return (
    <div>
        <form className='flex items-center justify-between bg-white border-t p-1' onSubmit={handleSubmit}>
            <div className='px-2 my-1 flex items-center justify-between w-full gap-2 rounded-3xl'>
                <input 
                type="text" 
                placeholder='Type a message...' 
                className='w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700'>
                  {loading ? <div className='animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent'></div> : <BsSend />}
                </button>
            </div>
        </form>
    </div>
  )
}

export default MessageInput