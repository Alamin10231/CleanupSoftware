import { assets } from "@/assets/assets";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import UserCard from "@/Components/UserCard";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { useGetAllClientQuery } from "@/redux/api/apiSlice";

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

const Clients = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch("/User.json")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error loading users:", err));
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen mt-6">
      {/* Fixed Top Section */}
      <div className="flex-shrink-0">
        {/* Title */}
        <div className="flex justify-between">
          <div>
            <h2 className="text-black text-2xl font-bold">Clients</h2>
            <p className=" text-[#808080] text-base mt-1">
              Manage clients and subscription
            </p>
          </div>
          <div>
            <Dialog>
              <DialogTrigger>
                <Button icon={<FaPlus />} text="Add Client" />
              </DialogTrigger>
              <DialogContent className="bg-white border-0 rounded-lg">
                <DialogHeader>
                  <DialogTitle>New Client</DialogTitle>
                  <DialogDescription>
                    <form>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="grid grid-cols-1 items-center ">
                          <label htmlFor="name" className="text-left">
                            Name<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="col-span-3 border border-gray-300 rounded-md p-2 w-full"
                          />
                        </div>
                        <div className="grid grid-cols-1 items-center">
                          <label htmlFor="email" className="text-left">
                            Email<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="col-span-3 border border-gray-300 rounded-md p-2 w-full"
                          />
                        </div>
                        <div className="grid grid-cols-1 items-center">
                          <label htmlFor="phone" className="text-left">
                            Phone<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="phone"
                            id="phone"
                            className="col-span-3 border border-gray-300 rounded-md p-2 w-full"
                          />
                        </div>
                        <div className="grid grid-cols-1 items-center">
                          <label htmlFor="address" className="text-left">
                            Address<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="address"
                            id="address"
                            className="col-span-3 border border-gray-300 rounded-md p-2 w-full"
                          />
                        </div>
                        <div className="col-span-2 gap-2 grid grid-cols-1">
                          <div className="grid grid-cols-1 items-center">
                            <label htmlFor="tags" className="text-left">
                              Note
                            </label>
                            <input
                              type="note"
                              id="note"
                              className="col-span-3 border border-gray-300 rounded-md p-2 w-full"
                              placeholder="Enter note here..."
                            />
                          </div>
                          <div className="grid grid-cols-1 items-center">
                            <label htmlFor="buildings" className="text-left">
                              Associated Buildings
                            </label>
                            <input
                              type="buildings"
                              id="buildings"
                              className="col-span-3 border border-gray-300 rounded-md p-2 w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Top Card */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          <Card
            title="Total Client"
            number="04"
            iconSrc={assets.total_service}
            iconAlt="An icon of a shopping cart"
          />

          <Card
            title="Total Revenue"
            number={2540000}
            iconSrc={assets.Total_revenue}
            iconAlt="An icon of a shopping cart"
          />
          <Card
            title="Avg Popularity"
            number={"85%"}
            iconSrc={assets.Avg_Popularity}
            iconAlt="An icon of a shopping cart"
          />
        </div>

        {/* Search + Filters */}
        <div className="flex justify-between mt-10 mb-6 w-full">
          <div className="flex items-center border border-gray-400 p-2 rounded-xl w-full max-w-sm">
            <IoIosSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search by name, email or location..."
              className="outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-20">
            <div className="flex gap-2">
              <p className="text-base text-gray-500 py-2">Status</p>
              <p className="bg-green-100 p-2 text-green-600 rounded-full">
                Active
              </p>
              <p className="bg-yellow-100 p-2 text-yellow-600 rounded-full">
                Inactive
              </p>
              <p className="bg-red-100 p-2 text-red-600 rounded-full">
                Suspended
              </p>
            </div>
            <div className="flex gap-2">
              <p className="text-base text-gray-500 p-2">Type</p>
              <p className="bg-gray-100 p-2 text-gray-600 rounded-full">
                Individual
              </p>
              <p className="bg-gray-100 p-2 text-gray-600 rounded-full">
                Business
              </p>
            </div>
            <div className="flex gap-2">
              <p className="text-base p-2 text-gray-500">Plan</p>
              <p className="bg-gray-100 p-2 text-gray-600 rounded-full">
                Basic
              </p>
              <p className="bg-gray-100 p-2 text-gray-600 rounded-full">
                Premium
              </p>
              <p className="bg-gray-100 p-2 text-gray-600 rounded-full">
                Enterprise
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable User List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No users found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;
