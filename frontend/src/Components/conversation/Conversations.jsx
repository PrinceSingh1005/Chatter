import Conversation from './Conversation';
import useGetConversation from '../../Hooks/useGetConversation';
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  console.log("conversation", conversations);

  return (
    <div className="py-2 flex flex-col gap-2 overflow-auto">
      {conversations.map((conversation,idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      
      {loading && (
        <div className="mx-auto">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Conversations;