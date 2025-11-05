import React, { useEffect, useRef } from "react";
import { RouterProvider } from "react-router";
import { router } from "./Router";
import { toast } from "sonner";

export const RouterProver = () => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const websocket = new WebSocket(
      `wss://api.checkall.org/ws/notify/?token=${localStorage
        .getItem("access")
        ?.replace(/"/g, "")}`
    );

    ws.current = websocket;
    console.log("SUCCESSFULLY CONNECTED TO WEBSOCKET");

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if(data.type === "new_message"){
        toast.success(`${data.sender_name} sent you a message`, data.message)
      }
    //   if (!data.message || data.sender_email === user?.email) return;

      
    };



    return () => {
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, []);

  return <RouterProvider router={router} />;
};
