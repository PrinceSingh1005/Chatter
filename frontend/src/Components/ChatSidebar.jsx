import Conversations from "./conversation/Conversations";
import Logout from "./Logout";
import { SearchInput } from "./SearchInput";

export default function ChatSidebar() {
  return (
    <div className="w-full md:w-1/5 bg-white border-r overflow-y-auto h-screen flex flex-col justify-between">
      {/* <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Chatter</h1>
        </div> */}
      <SearchInput />
      <div className="h-9/10 overflow-y-auto p-4">
        <Conversations />
      </div>
      <div className="h-1/9">
      <Logout />
      </div>
    </div>
  );
}
