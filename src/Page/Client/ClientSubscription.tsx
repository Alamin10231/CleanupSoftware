import type { RootState } from "@/redux/store";
import { useGetSubscriptionClientQuery, useLazyGetEmployeeDetailsQuery } from "@/redux/features/Client/subscription.api";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";


interface Employee {
  id: number;
  username: string;
  name?: string;
  role?: string;
  rating?: number;
}

interface Subscription {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  assignedEmployees: Employee[];
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "employee";
  timestamp: Date;
}

const ClientSubscription = () => {
  const { data, isLoading, error } = useGetSubscriptionClientQuery();
  const[getEmployeeDetails] = useLazyGetEmployeeDetailsQuery();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);



  if (isLoading) return <p className="text-center mt-10">Loading subscriptions...</p>;
  if (error) return <p className="text-center mt-10">Error loading subscriptions</p>;

  console.log("Fetched subscription data:", data);

  console.log("Fetched subscription data:", data);

  const subscriptions: Subscription[] = data?.map((sub: any) => ({
    id: sub.id,
    name: sub.plan?.name || "No Plan Name",
    startDate: sub.start_date,
    endDate: sub.current_period_end,
    status: sub.status,
    assignedEmployees: sub.employee?.map((id: number) => ({
      id,
      name: `Employee ${id}`,
      role: "Cleaner",
      rating: 4.0,
    })) || [],
  }));

  const handleOpenChat = async (employee: Employee) => {
    setSelectedEmployee(employee);
    const empDetails = await getEmployeeDetails(employee.id).unwrap();
    console.log("Fetched employee details:", empDetails);
    console.log("Opening chat with:", employee);
    // TODO: Fetch chat history from API
    // Example API call structure:
    // const response = await fetch(`/api/chat/history/${employee.id}`);
    // const chatHistory = await response.json();
    // setMessages(chatHistory);

    // For now, load empty messages

    console.log("Setting up WebSocket connection for employee ID:", empDetails.email);

    ws.current?.close();

    if (!empDetails.email) {
      console.error("Employee email not found, cannot establish WebSocket connection");
      return;
    }


    const webSocket = new WebSocket(`ws://10.10.13.61:8015/ws/chat/one-to-one/${empDetails.email}/?token=${localStorage.getItem("access")?.replace(/"/g, "")}`);

    ws.current = webSocket;

    webSocket.onopen = () => {
      console.log('WebSocket connection established');
    };

    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received WebSocket message:", data);

      console.log("Message content:", data);

      if((data as any).sender_email === user?.email) return;
      

      if(data.message.trim() === "") return;

      setMessages((prev) => [...prev, {
        id: Date.now(),
        text: data.message,
        sender: "employee",
        timestamp: new Date(),
      }]);
    };
    

    // setMessages([]);
  };

  const handleCloseChat = () => {
    setSelectedEmployee(null);
    setMessages([]);
    ws.current?.close();
    ws.current = null;
    console.log("Websocket connection closed");
    ws.current?.close();
    ws.current = null;
    console.log("Websocket connection closed");
    setNewMessage("");
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedEmployee) return;

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsSending(true);
    if(ws.current && ws.current.readyState === WebSocket.OPEN) {
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
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Your Subscriptions
        </h1>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-all"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {subscription.name}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    subscription.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {subscription.status.toUpperCase()}
                </span>
              </div>

              {/* Dates */}
              <p className="text-gray-500 text-sm mb-4">
                {subscription.startDate} → {subscription.endDate}
              </p>

              {/* Employees */}
              <div className="space-y-3">
                {subscription.assignedEmployees.length > 0 ? (
                  subscription.assignedEmployees.map((emp) => (
                    <div
                      key={emp.id}
                      className="flex items-center justify-between gap-4 p-3 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                          {getInitials(emp.name!)}
                        </div>
                        <div>
                          <p className="text-gray-800 font-medium">{emp.name}</p>
                          <p className="text-gray-500 text-xs">{emp.role}</p>
                          <p className="text-gray-500 text-xs">⭐ {emp.rating}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleOpenChat(emp)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        Open Chat
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm text-center py-2">
                    No employees assigned
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Box Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col h-[85vh] max-h-[700px]">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b bg-blue-600 text-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-base sm:text-lg">
                  {getInitials(selectedEmployee.name!)}
                </div>
                <div>
                  <p className="font-semibold text-base sm:text-lg">{selectedEmployee.name}</p>
                  <p className="text-xs sm:text-sm text-blue-100">{selectedEmployee.role}</p>
                </div>
              </div>
              <button
                onClick={handleCloseChat}
                className="text-white hover:bg-blue-700 rounded-full p-2 sm:p-3 transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50">
              {messages.length === 0 ? (
                <p className="text-center text-gray-400 mt-10 text-sm sm:text-base">No messages yet. Start the conversation!</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
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
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 sm:p-6 border-t bg-white rounded-b-2xl">
              <div className="flex gap-2 sm:gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSending}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isSending}
                  className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                >
                  {isSending ? "..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientSubscription;
