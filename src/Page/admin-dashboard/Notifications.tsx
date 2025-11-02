import { Button } from "@/Components/ui/button";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  useGetNotificationsQuery,
  useMarkAllReadMutation,
  useMarkOneReadMutation,
} from "@/redux/features/admin/notifications/notifications.api";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/Components/ui/table";

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const Notifications = () => {
  const [page, setPage] = useState(1);
  const [allNotifications, setAllNotifications] = useState<any[]>([]);

  const { data, isLoading, isError, isFetching } = useGetNotificationsQuery(page);
  const [markAllRead, { isLoading: markAllLoading }] = useMarkAllReadMutation();
  const [markOneRead] = useMarkOneReadMutation();

  const [clickedIds, setClickedIds] = useState<number[]>([]);
  const observerTarget = useRef(null);

  // Append new notifications when data changes
  useEffect(() => {
    if (data?.results) {
      setAllNotifications((prev) => {
        const existingIds = new Set(prev.map(n => n.id));
        const newNotifications = data.results.filter((n: any) => !existingIds.has(n.id));
        return [...prev, ...newNotifications];
      });
    }
  }, [data]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && data?.next && !isFetching) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [data?.next, isFetching]);

  const handleMarkAll = async () => {
    try {
      await markAllRead({}).unwrap();
      setClickedIds(allNotifications.map((n: any) => n.id));
      console.log("All marked as read");
    } catch (err) {
      console.error("Error marking all as read", err);
    }
  };

  const handleMarkOne = async (id: number) => {
    try {
      setClickedIds((prev) => [...prev, id]);
      await markOneRead({ id }).unwrap();
      console.log(`Notification ${id} marked as read`);
    } catch (err) {
      console.error(`Error marking ${id} as read`, err);
    }
  };

  if (isLoading && page === 1) return <div>Loading...</div>;
  if (isError) return <div>Error loading notifications.</div>;

  return (
    <>
      <div className="flex justify-between items-center my-5">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="mt-2">Stay updated with your latest activities and tasks</p>
        </div>

        <Button onClick={handleMarkAll} disabled={markAllLoading}>
          {markAllLoading ? "Updating..." : "Mark all as read"}
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allNotifications.map((n: any) => {
              const isRead = n.is_read || clickedIds.includes(n.id);

              return (
                <TableRow
                  key={n.id}
                  onClick={() => {
                    if (!isRead) {
                      handleMarkOne(n.id);
                    }
                  }}
                  className={
                    isRead
                      ? "bg-gray-100 cursor-pointer"
                      : "bg-blue-100 cursor-pointer"
                  }
                >
                  <TableCell className="font-medium">{n.title}</TableCell>
                  <TableCell>{n.message}</TableCell>
                  <TableCell>{formatTimestamp(n.created_at)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Infinite scroll trigger */}
      <div ref={observerTarget} className="flex justify-center py-4">
        {isFetching && <div className="text-gray-500">Loading more...</div>}
        {!data?.next && allNotifications.length > 0 && (
          <div className="text-gray-500">No more notifications</div>
        )}
      </div>
    </>
  );
};

export default Notifications;
