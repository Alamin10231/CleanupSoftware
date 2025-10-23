import { useState } from "react";
import { Button } from "@/Components/ui/button";

const notificationsData = [
    {
        "id": 307,
        "object_repr": "Aut voluptas in nisi - Kibo Ayers",
        "changes": { "is_active": [ "True", "False" ] },
        "timestamp": "2025-10-23T21:35:16.252745Z",
        "message": "Planmodel updated by System"
    },
    {
        "id": 306,
        "object_repr": "Repudiandae eius vol - Camille Sharp",
        "changes": { "is_active": [ "True", "False" ] },
        "timestamp": "2025-10-23T21:35:12.910391Z",
        "message": "Planmodel updated by System"
    },
    {
        "id": 305,
        "object_repr": "Porro Nam nihil volu - Stephen Hopkinsss",
        "changes": { "is_active": [ "True", "False" ] },
        "timestamp": "2025-10-23T21:35:10.828334Z",
        "message": "Planmodel updated by System"
    }
];

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const formatChanges = (changes: any) => {
    const changeKey = Object.keys(changes)[0];
    if (changeKey === 'is_active') {
        const [from, to] = changes[changeKey];
        return `Status changed from ${from === 'True' ? 'Active' : 'Inactive'} to ${to === 'True' ? 'Active' : 'Inactive'}`;
    }
    return JSON.stringify(changes);
}

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData.map(n => ({...n, status: 'new'})));

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, status: "read" })));
  };

  const markOneAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, status: "read" } : n)));
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center my-5">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="mt-2">Stay updated with your latest activities and tasks</p>
        </div>
        <Button onClick={markAllAsRead}>
            Mark all as read
        </Button>
      </div>

      {/* Notification list */}
      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markOneAsRead(n.id)}
            className={`flex justify-between rounded-xl p-6 cursor-pointer border border-gray-300 shadow-sm ${
              n.status === "new" ? "bg-blue-100" : "bg-gray-50"
            }`}
          >
            <div>
              <h2 className="font-semibold text-lg">{n.object_repr}</h2>
              <p className="mt-2 text-gray-700">{n.message}</p>
              <p className="mt-1 text-sm text-gray-500">{formatChanges(n.changes)}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-500">{formatTimestamp(n.timestamp)}</p>
              {n.status === "new" && (
                <div className="mt-2 w-3 h-3 bg-blue-500 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notifications;
