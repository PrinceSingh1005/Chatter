import React from 'react'

const Message = () => {
    return (
        <div>
            <div className="flex items-start gap-2 mb-4">
                {/* Left chat (received message) */}
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            alt="User avatar"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-start max-w-xs">
                    <div className="flex items-center gap-1 text-sm">
                        <span className="font-semibold">Obi-Wan Kenobi</span>
                        <span className="text-xs text-gray-500">12:45</span>
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 w-32 md:w-44 lg:w-full">
                        You were the Chosen One!
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Delivered</div>
                </div>
            </div>

            <div className="flex items-start gap-2 mb-4 justify-end">
                {/* Right chat (sent message) */}
                <div className="flex flex-col items-end max-w-xs">
                    <div className="flex items-center gap-1 text-sm">
                        <span className="font-semibold">Anakin</span>
                        <span className="text-xs text-gray-500">12:46</span>
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-blue-500 text-white">
                        I hate you!
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Seen at 12:46</div>
                </div>
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            alt="User avatar"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                    </div>
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