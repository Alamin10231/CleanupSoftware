import { useGetAllClientQuery } from "@/redux/api/apiSlice";
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
  user: UserData;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {

  
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-lg bg-white w-full">
      {/* Top Section */}
      <div className="flex items-start justify-between pb-3 border-b border-gray-300">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover border border-gray-300"
          />
          <div>
            <h2 className="text-lg font-bold">{user.name}</h2>
            <div className="flex flex-wrap gap-2 mt-1">
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
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <FaEnvelope /> {user.email}
              </span>
              <span className="flex items-center gap-1">
                <FaPhoneAlt /> {user.phone}
              </span>
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt /> {user.location}
              </span>
            </div>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex gap-3 text-gray-600">
          <FaEye className="cursor-pointer hover:text-blue-500" />
          <FaEdit className="cursor-pointer hover:text-green-500" />
          <FaTrash className="cursor-pointer hover:text-red-500" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-5 text-center mt-4 border-b border-gray-300 pb-3 text-sm font-semibold">
        <div>
          <p className="text-gray-500">REVENUE</p>
          <p>SAR {user.stats.revenue}</p>
        </div>
        <div>
          <p className="text-gray-500">SERVICES</p>
          <p>{user.stats.services}</p>
        </div>
        <div>
          <p className="text-gray-500">RATING</p>
          <p>{user.stats.rating}</p>
        </div>
        <div>
          <p className="text-gray-500">BUILDING</p>
          <p>{user.stats.building}</p>
        </div>
        <div>
          <p className="text-gray-500">LAST SERVICES</p>
          <p>{user.stats.last_service}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between text-xs text-gray-600 pt-2">
        <span>Joined: {user.joined_date}</span>
        <span>ID: {user.id}</span>
      </div>
    </div>
  );
};

export default UserCard;
