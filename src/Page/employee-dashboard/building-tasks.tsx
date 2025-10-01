import  { useState } from "react";

type Building = {
  name: string;
  address: string;
  status: "Active" | "Inactive";
  employees: number;
};

const buildings: Building[] = [
  { name: "Building A", address: "456 Oak Street, Anytown, UAE", status: "Active", employees: 50 },
  { name: "Building B", address: "212 Pine Street, Anytown, UAE", status: "Inactive", employees: 20 },
  { name: "Building C", address: "101 Maple Drive, Anytown, UAE", status: "Active", employees: 30 },
  { name: "Building D", address: "222 Cedar Lane, Anytown, UAE", status: "Active", employees: 80 },
  { name: "Building E", address: "533 Birch Road, Anytown, UAE", status: "Inactive", employees: 40 },
];

export default function RegionDashboard() {
  const [page, setPage] = useState(1);
  const pageSize = 2;

  const totalPages = Math.ceil(buildings.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedBuildings = buildings.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-6 space-y-6">
      {/* Analytics Summary Card */}
  <div className="bg-white shadow rounded-lg p-6 space-y-3">
  {/* Main Title */}
  <h2 className="text-3xl font-extrabold text-gray-900">
    Building & Region Tasks
  </h2>

  {/* Sub Title */}
  <h3 className="text-xl font-semibold text-gray-700">
    Analytics Summary
  </h3>

  {/* Region Name */}
  <p className="text-2xl font-bold ">Asia Region</p>

  {/* Address */}
  <p className="text-base text-gray-500">
    123 Main Street, Anytown, UAE
  </p>

  {/* Breadcrumb */}
  <p className="text-sm text-gray-500 font-medium">
    Regions / Asia Region
  </p>
</div>


      {/* Region Details as Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500 text-sm">Status</p>
          <p className="text-lg font-semibold text-green-600">Active</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500 text-sm">Total Employees</p>
          <p className="text-lg font-semibold">250</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500 text-sm">Total Buildings</p>
          <p className="text-lg font-semibold">5</p>
        </div>
      </div>

      {/* Buildings Table with Pagination */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-3 bg-gray-100">
          <input
            type="text"
            placeholder="Search buildings"
            className="w-full px-3 py-2 rounded-md border text-sm outline-none"
          />
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Address</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Employees</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBuildings.map((b, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{b.name}</td>
                <td className="p-3">{b.address}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      b.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="p-3">{b.employees}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center p-3 bg-gray-50">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-md border text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <p className="text-sm">
            Page {page} of {totalPages}
          </p>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-md border text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Region Map */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Region Map</h3>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Map_of_Northwest_region.png/640px-Map_of_Northwest_region.png"
          alt="Region Map"
          className="w-full h-72 object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
