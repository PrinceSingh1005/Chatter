import ChatSidebar from "./ChatSidebar";
import MessageContainer from "./Messages/MessageContainer";
// import Notifications from "./Notifications";

export default function ChatLayout() {

  return (
    <div>
      <div>
        
      </div>
      <div className="flex flex-col md:flex-row h-screen bg-gray-50">
        <ChatSidebar />
        <MessageContainer />
        {/* <Notifications /> */}
      </div>
    </div>
  );
}
