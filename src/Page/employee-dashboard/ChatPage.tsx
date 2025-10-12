// e.g. in a page or route

import Chat from "@/Components/Chat/Chat";


export default function ChatPage() {
  return (
    <div className="p-4">
      <Chat wsUrl={import.meta.env.VITE_WS_URL || "ws://localhost:8000/ws/chat/room1/"} />
    </div>
  );
}
