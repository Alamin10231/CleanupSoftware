import { useState } from "react";
import Chat from "@/Components/Chat/Chat";
import ChatList from "@/Components/Chat/ChatList";
import type { User } from "@/Components/Chat/ChatList";

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 border-r border-gray-200 bg-white">
        <ChatList onSelectUser={setSelectedUser} />
      </div>
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="bg-white border-b border-gray-200 p-4">
              <h1 className="text-xl font-semibold">Chat with {selectedUser.name}</h1>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <Chat
                wsUrl={`${import.meta.env.VITE_WS_URL || "ws://localhost:8000/ws/chat/"}${selectedUser.id}/`}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
