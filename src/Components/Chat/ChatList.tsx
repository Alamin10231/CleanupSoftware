import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

const dummyUsers: User[] = [
  { id: "1", name: "Alice", avatar: "/public/default-avatar.png", online: true },
  { id: "2", name: "Bob", avatar: "/public/default-avatar.png", online: false },
  { id: "3", name: "Charlie", avatar: "/public/default-avatar.png", online: true },
  { id: "4", name: "David", avatar: "/public/default-avatar.png", online: false },
];

interface ChatListProps {
  onSelectUser: (user: User) => void;
}

export default function ChatList({ onSelectUser }: ChatListProps) {
  const [search, setSearch] = useState("");

  const filteredUsers = dummyUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Chats</CardTitle>
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-2"
        />
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-96 overflow-y-auto">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectUser(user)}
            >
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{user.name}</p>
              </div>
              {user.online ? (
                <div className="w-2 h-2 rounded-full bg-green-500" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-gray-400" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
