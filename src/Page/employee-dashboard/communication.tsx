import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetChatHistoryQuery } from "@/redux/features/employee/chat/getchathistory.api";





const dummyServices = [
  {
    id: "1",
    name: "AC Cleaning",
    status: "pending",
    region_name: "Dhaka",
    building_name: "Sky Tower",
    building_located_at: "Gulshan 2",
    client_email: ["client1@example.com"],
    created_at: "2025-11-05",
  },
  {
    id: "2",
    name: "Deep Cleaning",
    status: "completed",
    region_name: "Dhaka",
    building_name: "Bashundhara Block C",
    building_located_at: "Bashundhara",
    client_email: ["client2@example.com"],
    created_at: "2025-11-02",
  },
];

interface ChatMessage {
  id: number;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

const ServiceTable = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  const openChat = (service: any) => {
    setSelectedService(service);
    setMessages([
      {
        id: 1,
        sender: "bot",
        text: `Hello 👋! How can we help you with "${service.name}"?`,
        timestamp: new Date(),
      },
    ]);
  };
  const {data:ChatHistory} = useGetChatHistoryQuery();
  console.log(ChatHistory);
  
  const closeChat = () => {
    setSelectedService(null);
    setMessages([]);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now(),
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
    setSending(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          text: "Thanks! Our support team will assist soon 😊",
          timestamp: new Date(),
        },
      ]);
      setSending(false);
    }, 800);
  };

  return (
    <div className="w-full  px-6 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Assigned Tasks</h1>

      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Building</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Assigned</TableHead>
              <TableHead>Chat</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {dummyServices.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.name}</TableCell>
               
                <TableCell>{s.region_name}</TableCell>
                <TableCell>{s.building_name}</TableCell>
                <TableCell>{s.building_located_at}</TableCell>
                <TableCell>{s.client_email[0]}</TableCell>
                <TableCell>{s.created_at}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => openChat(s)}
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
                <h2 className="font-semibold text-lg">{selectedService.name}</h2>
                <p className="text-xs opacity-80">
                  Client: {selectedService.client_email[0]}
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
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-[75%] text-sm shadow-sm ${
                      msg.sender === "user"
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
