import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Button from "@/Components/Button";

interface Notification {
  id: number;
  title: string;
  message: string;
  status: string; // "new" or "read"
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load JSON
  useEffect(() => {
    fetch("/notifications.json")
      .then((res) => res.json())
      .then(setNotifications)
      .catch(console.error);
  }, []);

  // Mark all as read
  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, status: "read" }));
    setNotifications(updated);
  };

  // Mark one notification as read
  const markOneAsRead = (id: number) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, status: "read" } : n
    );
    setNotifications(updated);
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center my-5">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="mt-2">Stay updated with your latest activities and tasks</p>
        </div>
        <Button text="Mark all as read" onClick={markAllAsRead} />
      </div>

      {/* Notification list */}
      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markOneAsRead(n.id)}
            className={`flex justify-between rounded-xl p-6 cursor-pointer border border-gray-300 shadow-sm ${
              n.status === "new" ? "bg-blue-200" : "bg-gray-100"
            }`}
          >
            <div>
              <h2 className="font-semibold text-[20px]">{n.title}</h2>
              <p className="mt-2">{n.message}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-gray-500">{n.time}</p>
              <img
                src={n.status === "new" ? assets.blueDot : assets.grayDot}
                alt={n.status}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notifications;
