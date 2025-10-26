import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../Navbar";

const WebSocketChat = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user);
  const ws = useRef(null);
   console.log(`ws://10.10.13.61:8015/ws/chat/one-to-one/${
        user.username
      }/?token=${localStorage.getItem("access")}`)
  // Connect to WebSocket when component mounts
  useEffect(() => {
    ws.current = new WebSocket(
      `ws://10.10.13.61:8015/ws/chat/one-to-one/${
        "alamin8149822949"
      }/?token=${localStorage.getItem("access")?.replace(/"/g, "")}`
    );

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setChatLog((prev) => [...prev, data]);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const payload = {
        action: "send_message",
        message: message,
      };
      ws.current.send(JSON.stringify(payload));
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          height: "200px",
          overflowY: "scroll",
        }}
      >
        {chatLog.map((msg, index) => (
          <div key={index}>{msg.message || JSON.stringify(msg)}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default WebSocketChat;
