import { Button } from "@/Components/ui/button";
import { useGetNotificationsQuery } from "@/redux/features/admin/notifications/notifications.api";
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

const formatChanges = (changes: any) => {
    const changeEntries = Object.entries(changes);
    if (changeEntries.length === 0) {
        return "No changes";
    }
    if (changeEntries.length === 1) {
        const [key, value] = changeEntries[0];
        const [from, to] = value as [string, string];
        return `${key}: from "${String(from)}" to "${String(to)}"`;
    }
    return `${changeEntries.length} fields changed`;
}

const Notifications = () => {
    const { data, isLoading, isError } = useGetNotificationsQuery(undefined);

    if(isLoading) return <div>Loading...</div>;
    if(isError) return <div>Error loading notifications.</div>;

    const notifications = data.results?.map((n: any) => ({ ...n, status: 'new' })) || [];

  const markAllAsRead = () => {
  };

  const markOneAsRead = (id: number) => {
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

      {/* Notification table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Object</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Changes</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((n: any) => (
              <TableRow key={n.id} className={n.status === 'new' ? 'bg-blue-50' : ''} onClick={() => markOneAsRead(n.id)}>
                <TableCell className="font-medium">{n.object_repr}</TableCell>
                <TableCell>{n.message}</TableCell>
                <TableCell>{formatChanges(n.changes)}</TableCell>
                <TableCell>{formatTimestamp(n.timestamp)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Notifications;
