import { assets } from "@/assets/assets";
import Card from "@/Components/Card";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useGetAllClientsAdminQuery, useGetClientOverviewAdminQuery, useGetSearchClientsQuery } from "@/redux/features/admin/users/clients.api";
import { AddClient } from "./add-client";

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // queries
  const {
    data: all_Client,
    isLoading: all_Client_Loading,
    error: all_Client_error,
    refetch: refetchAll,
  } = useGetAllClientsAdminQuery(page);

  const {
    data: searchResults,
    isLoading: searchLoading,
    error: searchError,
  } = useGetSearchClientsQuery(debouncedSearch, {
    skip: debouncedSearch.trim() === "",
  });

  const {
    data: Overview,
    isLoading: overviewLoading,
    error: overviewError,
  } = useGetClientOverviewAdminQuery();

  const clientsToDisplay = debouncedSearch.trim()
    ? searchResults?.results || []
    : all_Client?.results || [];

  const loading =
    all_Client_Loading || overviewLoading || (debouncedSearch && searchLoading);
  const error = all_Client_error || overviewError || searchError;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading clients.</p>;

  const totalPages = debouncedSearch.trim()
    ? 1
    : Math.ceil(all_Client?.count / 10 || 1);

  return (
    <div className="flex flex-col h-screen">
      {/* ===== Top Section ===== */}
      <div className="flex-shrink-0">
        {/* Title */}
        <div className="flex justify-between">
          <div>
            <h2 className="text-black text-2xl font-bold">Clients</h2>
            <p className="text-[#808080] text-base mt-1">
              Manage clients and subscription
            </p>
          </div>
          <AddClient />
        </div>

        {/* ===== Top Cards ===== */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-6">
          <Card
            title="Total Client"
            number={Overview?.total_client ?? 0}
            iconSrc={assets.total_service}
            iconAlt="Clients icon"
          />
          <Card
            title="Total Revenue"
            number={Overview?.total_client_pay ?? 0}
            iconSrc={assets.Total_revenue}
            iconAlt="Revenue icon"
          />
          <Card
            title="Client Rating"
            number={Overview?.client_rating ?? 0}
            iconSrc={assets.Avg_Popularity}
            iconAlt="Total Services icon"
          />
          <Card
            title="Active Bookings"
            number={Overview?.active_booking ?? 0}
            iconSrc={assets.Avg_Popularity}
            iconAlt="Active Bookings icon"
          />
        </div>

        {/* ===== Search + Filters ===== */}
        <div className="flex justify-between mt-10 mb-6 w-full">
          {/* Search */}
          <div className="flex items-center border border-gray-400 p-2 rounded-xl w-full max-w-2xl">
            <IoIosSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search by name, email or location..."
              className="outline-none w-full"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* ===== Table ===== */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {clientsToDisplay.length > 0 ? (
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr className="text-left text-gray-700">
                <th className="p-3">ID</th>
                <th className="p-3">Avatar</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
                <th className="p-3">Services</th>
                <th className="p-3">Pay</th>
                <th className="p-3">Building</th>
                <th className="p-3">Joined</th>
                {/* <th className="p-3">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {clientsToDisplay.map((client: any) => (
                <tr
                  key={client.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-3">{client.id}</td>
                  <td className="p-3">
                    <img
                      src={
                        client.client_profile?.avatar ?? "/default-avatar.png"
                      }
                      alt={client.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-300"
                    />
                  </td>
                  <td className="p-3 font-semibold">{client.name}</td>
                  <td className="p-3">{client.email}</td>
                  <td className="p-3">{client.prime_phone}</td>
                  <td className="p-3">
                    {client.client_profile?.location ?? "N/A"}
                  </td>
                  <td className="p-3">
                    {client.is_active ? (
                      <span className="bg-green-100 text-green-600 p-1 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-600 p-1 rounded-full">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="p-3">{client.each_client_services}</td>
                  <td className="p-3">{client.each_client_pay}</td>
                  <td className="p-3">{client.each_client_building}</td>
                  <td className="p-3">
                    {new Date(client.date_joined).toLocaleDateString()}
                  </td>
                  {/* <td className="p-3 flex gap-3 text-gray-600">
                    <button className="hover:text-green-500 cursor-pointer">
                      <FaEdit />
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center p-5">No users found.</p>
        )}

        {!debouncedSearch && (
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
              className={`px-4 py-2 cursor-pointer rounded border ${
                page > 1
                  ? "bg-white hover:bg-gray-100"
                  : "bg-gray-200 cursor-not-allowed"
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className={`px-4 py-2 cursor-pointer rounded-md text-white font-medium ${
                page < totalPages
                  ? "bg-blue-600 hover:bg-gray-300 hover:text-black"
                  : "bg-gray-200 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;
