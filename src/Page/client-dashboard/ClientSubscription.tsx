import type { RootState } from "@/redux/store";
import {
  useGetSubscriptionClientQuery,
  useLazyGetEmployeeDetailsQuery,
} from "@/redux/features/Client/subscription.api";
import { useLazyGetChatMessagesQuery } from "@/redux/features/employee/chat/getchathistory.api";
import React, { useEffect, useRef, useState } from "react";
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
  const [getEmployeeDetails] = useLazyGetEmployeeDetailsQuery();
  const [fetchChatMessages] = useLazyGetChatMessagesQuery();

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const ws = useRef<WebSocket | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 80);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isLoading) return <p className="text-center mt-10">Loading subscriptions...</p>;
  if (error) return <p className="text-center mt-10">Error loading subscriptions</p>;

  const subscriptions: Subscription[] = data?.map((sub: any) => ({
    id: sub.id,
    name: sub.plan?.name || "No Plan Name",
    startDate: sub.start_date,
    endDate: sub.current_period_end,
    status: sub.status,
    assignedEmployees:
      sub.employee?.map((id: number) => ({
        id,
        name: `Employee ${id}`,
        role: "Cleaner",
        rating: 4.0,
      })) || [],
  }));

  const handleOpenChat = async (employee: Employee) => {
    setSelectedEmployee(employee);

    const emp = await getEmployeeDetails(employee.id).unwrap();
    if (!emp.email) return console.error("No employee email found");

    // ✅ Fetch history first
    const res = await fetchChatMessages(emp.email).unwrap();

    const history = res?.messages?.map((m: any) => ({
      id: m.id,
      text: m.content,
      sender: m.sender === user?.email ? "user" : "employee",
      timestamp: new Date(m.timestamp),
    })) || [];

    setMessages(history);

    // ✅ Now connect WebSocket
    ws.current?.close();
    ws.current = new WebSocket(
      `wss://api.checkall.org/ws/chat/one-to-one/${emp.email}/?token=${localStorage
        .getItem("access")
        ?.replace(/"/g, "")}`
    );

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (!data.message || data.sender_email === user?.email) return;

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
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const msg: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, msg]);

    ws.current?.send(JSON.stringify({ action: "send_message", message: newMessage }));
    setNewMessage("");
  };

  const handleCloseChat = () => {
    ws.current?.close();
    setSelectedEmployee(null);
    setMessages([]);
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="mx-auto px-4">
     <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
  Your Subscriptions
</h1>

<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {subscriptions.map((subscription) => (
    <div
      key={subscription.id}
      className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
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

        <div className="text-sm text-gray-600 mb-4 space-y-1">
          <p>
            <span className="font-medium">Start:</span>{" "}
            {new Date(subscription.startDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">End:</span>{" "}
            {new Date(subscription.endDate).toLocaleDateString()}
          </p>
        </div>

        <p className="text-xs text-gray-400 mb-2">Assigned Employees</p>
        <div className="space-y-3">
          {subscription.assignedEmployees.length > 0 ? (
            subscription.assignedEmployees.map((emp) => (
              <div
                key={emp.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                    {getInitials(emp.name!)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{emp.name}</p>
                    <p className="text-xs text-gray-500">{emp.role}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenChat(emp)}
                  className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition"
                >
                  Chat
                </button>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-sm text-center py-2">
              No employees assigned
            </div>
          )}
        </div>
      </div>
    </div>
  ))}
</div>

      {selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-3xl h-[85vh] rounded-2xl shadow-2xl flex flex-col">

            <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
              <div>
                <h2 className="font-semibold text-lg">{selectedEmployee.name}</h2>
                <p className="text-xs opacity-80">{selectedEmployee.role}</p>
              </div>
              <button onClick={handleCloseChat} className="p-2 bg-blue-700 rounded-full">
                ✕
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`px-4 py-2 rounded-xl max-w-[75%] text-sm shadow-sm ${
                      msg.sender === "user" ? "bg-blue-600 text-white" : "bg-white border"
                    }`}
                  >
                    {msg.text}
                    <div className="text-[10px] opacity-50 mt-0.5">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-white flex gap-2">
              <input
                className="flex-1 border px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Write a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientSubscription;
