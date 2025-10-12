import { assets } from "@/assets/assets";
import Card from "@/Components/Card";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
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
  { name: "Building F", address: "533 Birch Road, Anytown, UAE", status: "Active", employees: 40 },
  { name: "Building G", address: "533 Birch Road, Anytown, UAE", status: "Inactive", employees: 40 },
  { name: "Building H", address: "533 Birch Road, Anytown, UAE", status: "Active", employees: 40 },
  { name: "Building I", address: "533 Birch Road, Anytown, UAE", status: "Inactive", employees: 40 },
  { name: "Building J", address: "533 Birch Road, Anytown, UAE", status: "Active", employees: 40 },
];

export default function RegionDashboard() {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(buildings.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedBuildings = buildings.slice(startIndex, startIndex + pageSize);
  const navigate = useNavigate();
  // const handleView = (buildingName: string) => { `navigate(/employee-building/${encodeURIComponent(buildingName)}`);
  const handleView = (buildingName: string) => {
  navigate(`/employee-building/${encodeURIComponent(buildingName)}`);
};


  return (
    <div>
      {/* Region Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <Card title="Status" number="Active" iconSrc={assets.Active} />
        <Card title="Total Employees" number={250} iconSrc={assets.totalEmployee} />
        <Card title="Total Buildings" number={5} iconSrc={assets.region} />
      </div>

      {/* Buildings Table */}
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
              <th className="text-left p-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBuildings.map((b, i) => (
              <tr key={i} className="border-t hover:bg-gray-50 transition">
                <td className="p-3">{b.name}</td>
                <td className="p-3">{b.address}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${b.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                      }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="p-3">{b.employees}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleView(b.name)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="View Details"
                  >
                    <LuEye size={20} />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
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
      <div className="bg-white shadow rounded-lg p-4 mt-5">
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
