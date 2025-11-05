import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useGetChatHistoryQuery,
  useLazyGetChatMessagesQuery,
} from "@/redux/features/employee/chat/getchathistory.api";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface ChatMessage {
  id: number;
  sender: string;
  text: string;
  timestamp: Date;
}

const ServiceTable = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: ChatHistory } = useGetChatHistoryQuery();
  const [fetch_chat_messages] = useLazyGetChatMessagesQuery();
  const ws = useRef<WebSocket | null>(null);

  const [selectedService, setSelectedService] = useState<any>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  // Get Service name (subscription or special service)
  const getServiceName = (user: any) => {
    if (user.subscription) return user.subscription.name;
    if (user.special_service) return user.special_service.name;
    return "No Service";
  };

  const openChat = async (user_params: any) => {
    if (ws) {
      ws.current?.close();
    }

    const webSocket = new WebSocket(
      `ws://10.10.13.61:8015/ws/chat/one-to-one/${
        user_params.email
      }/?token=${localStorage.getItem("access")?.replace(/"/g, "")}`
    );

    console.log("Connected to websocket");

    ws.current = webSocket;

    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received WebSocket message:", data);

      console.log("Message content:", data);

      if (!data.message) return;

      if ((data as any).sender_email === user?.email) return;

      if (data.message.trim() === "") return;

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: data.message,
          sender: data.sender_email,
          timestamp: new Date(),
        },
      ]);
    };

    setSelectedService(user_params);
    setMessages([]);
    console.log(user_params);

    const response = await fetch_chat_messages(user_params.email);

    if (response.data) {
      if (response.data && response.data.messages.length > 0) {
        const mappedMessages = response.data.messages.map((message: any) => {
          return {
            id: message.id,
            sender: message.sender,
            timestamp: new Date(message.timestamp),
            text: message.content,
          } as ChatMessage;
        });

        console.log(mappedMessages);

        setMessages(mappedMessages);
      }
    }
  };

  const closeChat = () => {
    setSelectedService(null);
    setMessages([]);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const msg: ChatMessage = {
      id: Date.now(),
      sender: user?.email ?? "",
      text: newMessage,
      timestamp: new Date(),
    };

    // add message in UI
    setMessages((prev) => [...prev, msg]);

    // store and reset input
    const outgoingText = newMessage;
    setNewMessage("");

    // Send to websocket
    try {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(
          JSON.stringify({
            action: "send_message",
            message: outgoingText,
          })
        );
      } else {
        console.warn("WebSocket not connected");
      }
    } catch (err) {
      console.error("WebSocket send error:", err);
    }
  };

  return (
    <div className="w-full px-6 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Communication </h1>

      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Building</TableHead>
              {/* <TableHead>Location</TableHead> */}
              <TableHead>Email</TableHead>
              {/* <TableHead>Status</TableHead> */}
              <TableHead>Chat</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {ChatHistory?.users
              ?.filter((user: any) => user.subscription || user.special_service) // only users with service
              .map((user: any) => (
                <TableRow key={user.email}>
                  <TableCell>
                    {user.subscription?.name || user.special_service?.name}
                  </TableCell>
                  <TableCell>
                    {user.subscription?.region ||
                      user.special_service?.region ||
                      "-"}
                  </TableCell>
                  <TableCell>
                    {user.subscription?.building ||
                      user.special_service?.building ||
                      "-"}
                  </TableCell>
                  {/* <TableCell>{user.subscription?.location || user.special_service?.location || "-"}</TableCell> */}
                  <TableCell>{user.email}</TableCell>
                  {/* <TableCell>{user.status}</TableCell> */}
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => openChat(user)}
                    >
                      <MessageCircle size={16} /> Chat
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>

      {/* Chat Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-3xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
              <div>
                <h2 className="font-semibold text-lg">
                  {getServiceName(selectedService)}
                </h2>
                <p className="text-xs opacity-80">
                  Client: {selectedService.email}
                </p>
              </div>
              <button
                onClick={closeChat}
                className="p-2 rounded-full bg-blue-700 hover:bg-blue-800 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === user?.email ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-[75%] text-sm shadow-sm ${
                      msg.sender === user?.email
                        ? "bg-blue-600 text-white"
                        : "bg-white border text-gray-800"
                    }`}
                  >
                    {msg.text}
                    <div className="text-[10px] opacity-50 mt-0.5">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t bg-white flex gap-2">
              <input
                className="flex-1 border px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Write a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage} disabled={sending}>
                {sending ? "..." : "Send"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTable;
