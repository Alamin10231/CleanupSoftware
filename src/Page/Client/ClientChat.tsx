import { useState } from "react";

const ClientChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Do you remember what you did last night at the workshop? 😂", sender: "other", time: "18:12", liked: true },
    { id: 2, text: "no haha", sender: "me", time: "18:16" },
    { id: 3, text: "i don’t remember anything 😅", sender: "me", time: "18:18" },
    { id: 1, text: "Do you remember what you did last night at the workshop? 😂", sender: "other", time: "18:12", liked: true },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: Date.now(),
      text: newMessage,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[85vh] bg-gray-50 ">

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto rounded-2xl bg-[#a7c4f2] p-4 space-y-3">
        <p className="text-center text-sm text-gray-700 mb-2">Today</p>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`relative max-w-xs px-4 py-2 rounded-2xl text-sm ${
                msg.sender === "me"
                  ? "bg-green-300 text-black rounded-br-none"
                  : "bg-white text-gray-900 rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <div className="text-xs text-gray-600 mt-1 flex items-center justify-end gap-1">
                <span>{msg.time}</span>
                {msg.liked && msg.sender !== "me" && <span>❤️</span>}
                {msg.sender === "me" && <span>✔️</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="bg-white p-3 flex items-center gap-2 border-t">
        <input
          type="text"
          placeholder="Message"
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ClientChat;
