import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaEdit, FaTrash, FaEye } from "react-icons/fa";

interface UserStats {
  revenue: number;
  services: number;
  rating: number;
  building: number;
  last_service: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: string[];
  avatar: string;
  stats: UserStats;
  joined_date: string;
}

interface UserCardProps {
  users: UserData[];
}

const UserCard: React.FC<UserCardProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr className="text-left text-gray-700">
            <th className="p-3">Avatar</th>
            <th className="p-3">Name</th>
            <th className="p-3">Status</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Location</th>
            <th className="p-3">Revenue</th>
            <th className="p-3">Services</th>
            <th className="p-3">Rating</th>
            <th className="p-3">Building</th>
            <th className="p-3">Last Service</th>
            <th className="p-3">Joined</th>
            <th className="p-3">ID</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="p-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border border-gray-300 object-cover"
                />
              </td>
              <td className="p-3 font-semibold">{user.name}</td>
              <td className="p-3">
                <div className="flex flex-wrap gap-1">
                  {user.status.map((tag, i) => {
                    let tagClass = "bg-gray-200 text-gray-700 border border-gray-300";
                    if (tag === "inactive") {
                      tagClass = "bg-yellow-100 text-yellow-700 border border-yellow-400";
                    } else if (tag === "active") {
                      tagClass = "bg-green-100 text-green-600 border border-green-400";
                    }
                    return (
                      <span key={i} className={`text-xs px-2 py-1 rounded-full ${tagClass}`}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </td>
              <td className="p-3 flex items-center gap-1 text-gray-600">
                <FaEnvelope /> {user.email}
              </td>
              <td className="p-3 flex items-center gap-1 text-gray-600">
                <FaPhoneAlt /> {user.phone}
              </td>
              <td className="p-3 flex items-center gap-1 text-gray-600">
                <FaMapMarkerAlt /> {user.location}
              </td>
              <td className="p-3 font-medium">SAR {user.stats.revenue}</td>
              <td className="p-3">{user.stats.services}</td>
              <td className="p-3">{user.stats.rating}</td>
              <td className="p-3">{user.stats.building}</td>
              <td className="p-3">{user.stats.last_service}</td>
              <td className="p-3">{user.joined_date}</td>
              <td className="p-3">{user.id}</td>
              <td className="p-3 text-center">
                <div className="flex justify-center gap-3 text-gray-600">
                  <FaEye className="cursor-pointer hover:text-blue-500" />
                  <FaEdit className="cursor-pointer hover:text-green-500" />
                  <FaTrash className="cursor-pointer hover:text-red-500" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCard;
