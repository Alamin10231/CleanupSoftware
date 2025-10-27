import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { Send, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import type { RootState } from "../Navbar";

// Types
interface ChatMessage {
  message?: string;
  sender?: string;
  timestamp?: string;
  action?: string;
  [key: string]: any;
}

type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

// Constants
const WS_BASE_URL = "ws://10.10.13.61:8015";
const RECONNECT_INTERVAL = 3000;
const MAX_RECONNECT_ATTEMPTS = 5;

// Utility Functions
const getAccessToken = (): string => {
  const token = localStorage.getItem("access");
  return token ? token.replace(/"/g, "") : "";
};

const buildWebSocketUrl = (username: string, token: string): string => {
  return `${WS_BASE_URL}/ws/chat/one-to-one/${"alamin8149822949"}/?token=${token}`;
};

const formatTimestamp = (timestamp?: string): string => {
  if (!timestamp) return new Date().toLocaleTimeString();
  return new Date(timestamp).toLocaleTimeString();
};

// Components
interface MessageBubbleProps {
  message: ChatMessage;
  isOwnMessage: boolean;
}

function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
  return (
    <div
      className={`flex items-end gap-2 ${
        isOwnMessage ? "justify-end" : "justify-start"
      } mb-4`}
    >
      {!isOwnMessage && (
        <img
          src="/public/default-avatar.png"
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
      )}
      <div
        className={`max-w-[70%] rounded-lg px-4 py-3 ${
          isOwnMessage
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        {message.sender && !isOwnMessage && (
          <div className="text-xs font-bold mb-1 text-gray-600">
            {message.sender}
          </div>
        )}
        <p className="text-sm break-words">{message.message || JSON.stringify(message)}</p>
        <div className="text-xs mt-1 text-right opacity-70">
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
      {isOwnMessage && (
        <img
          src="/public/default-avatar.png"
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
      )}
    </div>
  );
}

interface ConnectionStatusBadgeProps {
  status: ConnectionStatus;
}

function ConnectionStatusBadge({ status }: ConnectionStatusBadgeProps) {
  const statusConfig = {
    connecting: { color: "bg-yellow-500", text: "Connecting..." },
    connected: { color: "bg-green-500", text: "Connected" },
    disconnected: { color: "bg-red-500", text: "Disconnected" },
    error: { color: "bg-red-500", text: "Error" },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.color} animate-pulse`} />
      <span className="text-xs text-gray-600">{config.text}</span>
    </div>
  );
}

// Main Component
export default function WebSocketChat({ wsUrl }: { wsUrl: string }) {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { user } = useSelector((state: RootState) => state.auth);
  const ws = useRef<WebSocket | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatLog, scrollToBottom]);

  // WebSocket connection
  const connectWebSocket = useCallback(() => {
    if (!user?.username) {
      setError("User not authenticated. Please log in.");
      setConnectionStatus("error");
      return;
    }

    const token = getAccessToken();
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      setConnectionStatus("error");
      return;
    }

    try {
      const finalWsUrl = `${WS_BASE_URL}/ws/chat/one-to-one/${"alamin8149822949"}/?token=${token}`;
      console.log("Connecting to WebSocket:", finalWsUrl);

      ws.current = new WebSocket(finalWsUrl);

      ws.current.onopen = () => {
        console.log("✅ WebSocket connected");
        setConnectionStatus("connected");
        setReconnectAttempts(0);
        setError(null);

        // Send any saved messages
        const savedMessages = JSON.parse(localStorage.getItem("offlineMessages") || "[]");
        if (savedMessages.length > 0) {
          savedMessages.forEach((msg: ChatMessage) => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
              try {
                ws.current.send(JSON.stringify(msg));
                console.log("📤 Offline message sent:", msg);
              } catch (err) {
                console.error("Error sending offline message:", err);
              }
            }
          });
          localStorage.removeItem("offlineMessages");
        }
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("📩 Message received:", data);
          setChatLog((prev) => [...prev, data]);
        } catch (err) {
          console.error("Error parsing message:", err);
        }
      };

      ws.current.onerror = (event) => {
        console.error("❌ WebSocket error:", event);
        setError("Connection error occurred");
        setConnectionStatus("error");
      };

      ws.current.onclose = (event) => {
        console.log("🔌 WebSocket disconnected:", event.code, event.reason);
        setConnectionStatus("disconnected");

        // Attempt reconnection
        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          console.log(
            `Attempting to reconnect... (${reconnectAttempts + 1}/${MAX_RECONNECT_ATTEMPTS})`
          );
          reconnectTimeoutRef.current = setTimeout(() => {
            setReconnectAttempts((prev) => prev + 1);
            connectWebSocket();
          }, RECONNECT_INTERVAL);
        } else {
          setError(
            "Connection lost. Maximum reconnection attempts reached. Please refresh the page."
          );
        }
      };
    } catch (err) {
      console.error("Error creating WebSocket:", err);
      setError("Failed to establish connection");
      setConnectionStatus("error");
    }
  }, [user?.username, reconnectAttempts, wsUrl]);

  // Initialize WebSocket connection
  useEffect(() => {
    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connectWebSocket]);

  // Send message
  const sendMessage = useCallback(() => {
    if (!message.trim()) return;

    const payload = {
      action: "send_message",
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      try {
        ws.current.send(JSON.stringify(payload));
        console.log("📤 Message sent:", payload);
        setMessage("");
      } catch (err) {
        console.error("Error sending message:", err);
        setError("Failed to send message");
      }
    } else {
      // Save message to local storage if offline
      const savedMessages = JSON.parse(localStorage.getItem("offlineMessages") || "[]");
      savedMessages.push(payload);
      localStorage.setItem("offlineMessages", JSON.stringify(savedMessages));
      setChatLog((prev) => [...prev, { ...payload, sender: user.username, isOwnMessage: true }]);
      setMessage("");
      setError("You are offline. Message will be sent when you are back online.");
    }
  }, [message, user]);

  // Handle Enter key press
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  // Manual reconnect
  const handleReconnect = useCallback(() => {
    setReconnectAttempts(0);
    setError(null);
    connectWebSocket();
  }, [connectWebSocket]);

  if (!user) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please log in to access the chat.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>Chat with {user.name}</CardTitle>
          <ConnectionStatusBadge status={connectionStatus} />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              {connectionStatus === "disconnected" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReconnect}
                  className="ml-2"
                >
                  Reconnect
                </Button>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          {chatLog.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            chatLog.map((msg, index) => (
              <MessageBubble
                key={index}
                message={msg}
                isOwnMessage={msg.sender === user.username}
              />
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t p-4 bg-white">
          <div className="flex gap-2">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              disabled={connectionStatus !== "connected"}
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              disabled={
                !message.trim() || connectionStatus !== "connected"
              }
              size="icon"
            >
              {connectionStatus === "connecting" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          {connectionStatus !== "connected" && (
            <p className="text-xs text-gray-500 mt-2">
              Waiting for connection...
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
