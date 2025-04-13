import {useAuthContext} from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/formatTime';

const Message = ({message}) => {
    const {authUser} = useAuthContext();
    const {selectedConversation} = useConversation();
    const fromMe = message.senderId=== authUser._id;
    const chatClassName = fromMe ? 'justify-start' : 'justify-end';
    const profilePicture = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;
    const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-500';
    const senderName = fromMe ? 'You' : selectedConversation?.fullName || 'Unknown';
    const formattedTime = extractTime(message.createdAt);

    return (
        <div>
            <div className={`flex ${chatClassName}`}>
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            alt="User avatar"
                            src={profilePicture}
                        />
                    </div>
                </div>
                <div className="flex flex-col items-start max-w-xs">
                    <div className="flex items-center gap-1 text-sm">
                        <span className="font-semibold">{senderName}</span>
                    </div>
                    <div className={`px-4 py-2 rounded-b-2xl rounded-r-2xl ${bubbleBgColor} text-white w-fit`}>
                        {message.message}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{formattedTime}</div>
                </div>
            </div>

           
        </div>
    )
}

export default Message














// import React from 'react'

// const Message = () => {
//   return (
//     <div className='flex items-center justify-between px-4 py-2 border-b'>
//         <div>
//             <div>
//                 <img className='rounded-full w-10 h-10' src="profile1.avif" alt="Profile" />
//             </div>
//         </div>
//         <div className='flex flex-col ml-4'>
//             <h1 className='text-sm font-semibold'>John Doe</h1>
//             <p className='text-xs text-gray-500'>Hello, how are you?</p>
//             <span className='text-xl'>😊</span>
//         </div>
//     </div>
//   )
// }

// export default Message