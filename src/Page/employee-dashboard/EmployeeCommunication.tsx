import { useGetEmployeeTasksQuery } from "@/redux/features/employee/EmployeeTask.api";
import type { RootState } from "@/redux/store";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

interface Message {
  id: number;
  text: string;
  sender: "user" | "employee";
  timestamp: Date;
}

const EmployeeCommunication = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const ws = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { data: employeeTasks } = useGetEmployeeTasksQuery(user?.email || "");
  console.log(employeeTasks.results)
  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const payload = {
        action: "send_message",
        message: newMessage,
      };

      ws.current.send(JSON.stringify(payload));
    }

    try {
      // TODO: Send message to API
      // Example API call structure:
      /*
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: selectedEmployee.id,
          message: newMessage,
        }),
      });
      const data = await response.json();
      
      // Add employee response if received immediately
      if (data.response) {
        const employeeMessage: Message = {
          id: data.id,
          text: data.response,
          sender: "employee",
          timestamp: new Date(data.timestamp),
        };
        setMessages((prev) => [...prev, employeeMessage]);
      }
      */
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    ws.current?.close();

    const webSocket = new WebSocket(
      `ws://10.10.13.61:8015/ws/chat/one-to-one/osmangani3osm@gmail.com/?token=${localStorage.getItem("access")?.replace(/"/g, "")}`
    );
    ws.current = webSocket;

    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received WebSocket message:", data);

      console.log("Message content:", data);

      if ((data as any).sender_email === user?.email) return;

      if (data.message.trim() === "") return;

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: data.message,
          sender: "employee",
          timestamp: new Date(),
        },
      ]);
    };

    return () => {
      webSocket.close();
      ws.current = null;
    };
  }, []);

  return (
    <div className="flex flex-col h-[85vh] bg-gray-50 ">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400 mt-10 text-sm sm:text-base">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 sm:px-5 sm:py-3 ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                <p className="text-sm sm:text-base break-words">{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === "user" ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        )}
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

export default EmployeeCommunication;
