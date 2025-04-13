import useConversation from '../../zustand/useConversation.js';

const Conversation = ({conversation, lastIdx,emoji}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-400 hover:bg-opacity-20 p-2 rounded-md cursor-pointer ${isSelected ? 'bg-sky-400 bg-opacity-20' : ""}`
            } 
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className='rounded-full w-10 h-10 bg-slate-300 flex items-center justify-center'>
                    <img className='rounded-full h-full' src={conversation.profilePicture} alt='user avatar' />
                </div>
                <div className='flex flex-row justify-between items-center w-full'>
                    <p className='text-sm font-semibold'>{conversation.fullName}</p>
                    {/* <p className='text-xs text-gray-500'>Hello, how are you?</p> */}
                    <span className='text-xl'>{emoji}</span>
                </div>
            </div>
            {lastIdx && <div className='h-0.5 bg-gray-300 w-full'></div>}
        </>
    )
};

export default Conversation;
