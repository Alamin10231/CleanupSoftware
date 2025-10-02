import { useState } from "react";
import { Search } from "lucide-react";
import { Checkbox } from "@/Components/ui/checkbox";
import { Switch } from "@/Components/ui/switch";
import { GoDownload } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";

type Subscription = {
  id: number;
  property: string;
  owner: string;
  region: string;
  building: string;
  status: "active" | "due" | "paused" | "stopped";
  daysRemaining: number;
  totalDays: number;
  autoRenew: boolean | null;
};

const data: Subscription[] = [
  {
    id: 1,
    property: "Apt 304, Sunset Tower",
    owner: "John Smith • North Region",
    region: "North",
    building: "Sunset Tower",
    status: "active",
    daysRemaining: 23,
    totalDays: 30,
    autoRenew: true,
  },
  {
    id: 2,
    property: "Apt 102, Ocean View",
    owner: "Sarah Johnson • South Region",
    region: "South",
    building: "Ocean View",
    status: "due",
    daysRemaining: -2,
    totalDays: 32,
    autoRenew: false,
  },
  {
    id: 3,
    property: "Apt 507, Metro Plaza",
    owner: "Mike Davis • East Region",
    region: "East",
    building: "Metro Plaza",
    status: "paused",
    daysRemaining: 15,
    totalDays: 30,
    autoRenew: true,
  },
  {
    id: 4,
    property: "Apt 201, Sunset Tower",
    owner: "Emma Wilson • North Region",
    region: "North",
    building: "Sunset Tower",
    status: "stopped",
    daysRemaining: 0,
    totalDays: 30,
    autoRenew: null,
  },
];

export default function EmployeeSubscription() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "active" | "due" | "paused" | "stopped"
  >("All");
  const [regionFilter, setRegionFilter] = useState<
    "All" | "North" | "South" | "East"
  >("All");
  const [buildingFilter, setBuildingFilter] = useState<
    "All" | "Sunset Tower" | "Ocean View" | "Metro Plaza"
  >("All");

  const filtered = data.filter((s) => {
    const matchesSearch = s.property
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    const matchesRegion = regionFilter === "All" || s.region === regionFilter;
    const matchesBuilding =
      buildingFilter === "All" || s.building === buildingFilter;
    return matchesSearch && matchesStatus && matchesRegion && matchesBuilding;
  });

  const handleSelectAll = (check: boolean) => {
    if (check) setSelected(filtered.map((s) => s.id));
    else setSelected([]);
  };

  const selectSingle = (id: number, check: boolean) => {
    if (check) setSelected((prev) => [...prev, id]);
    else setSelected((prev) => prev.filter((x) => x !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <div className="flex gap-2">
          <button className="px-3 py-2 border rounded-md text-sm">
            Export
          </button>
        </div>
      </div>
      <p className="text-gray-500">
        Manage all property subscriptions and billing cycles
      </p>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search subscriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-2 border rounded-md w-full"
          />
        </div>

        {/* Status Filter */}
        <select
          className="border rounded-md px-3 py-2 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
        >
          <option value="All">All Status</option>
          <option value="active">Active</option>
          <option value="due">Due</option>
          <option value="paused">Paused</option>
          <option value="stopped">Stopped</option>
        </select>

        {/* Region Filter */}
        <select
          className="border rounded-md px-3 py-2 text-sm"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value as any)}
        >
          <option value="All">All Regions</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
        </select>

        {/* Building Filter */}
        <select
          className="border rounded-md px-3 py-2 text-sm"
          value={buildingFilter}
          onChange={(e) => setBuildingFilter(e.target.value as any)}
        >
          <option value="All">All Buildings</option>
          <option value="Sunset Tower">Sunset Tower</option>
          <option value="Ocean View">Ocean View</option>
          <option value="Metro Plaza">Metro Plaza</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th>
                <Checkbox
                  checked={
                    selected.length === filtered.length && filtered.length > 0
                  }
                  onCheckedChange={(val) => handleSelectAll(val as boolean)}
                />
              </th>
              <th className="p-3">Property & Owner</th>
              <th className="p-3">Status</th>
              <th className="p-3">Timeline</th>
              <th className="p-3">Auto-renew</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((sub) => (
              <tr key={sub.id} className="border-b">
                <td>
                  <Checkbox
                    checked={selected.includes(sub.id)}
                    onCheckedChange={(val) =>
                      selectSingle(sub.id, val as boolean)
                    }
                  />
                </td>
                <td className="p-3">
                  <div className="font-medium">{sub.property}</div>
                  <div className="text-xs text-gray-500">{sub.owner}</div>
                </td>
                <td className="p-3">
                  {sub.status === "active" && (
                    <span className="text-green-600">● Active & Paid</span>
                  )}
                  {sub.status === "due" && (
                    <span className="text-orange-600">● Payment Due</span>
                  )}
                  {sub.status === "paused" && (
                    <span className="text-blue-600">● Paused</span>
                  )}
                  {sub.status === "stopped" && (
                    <span className="text-red-600">● Stopped</span>
                  )}
                </td>
                <td className="p-3">
                  {sub.daysRemaining > 0 ? (
                    <span className="text-xs text-gray-600">
                      {sub.daysRemaining} days remaining
                    </span>
                  ) : sub.daysRemaining < 0 ? (
                    <span className="text-xs text-red-600">
                      {Math.abs(sub.daysRemaining)} days overdue
                    </span>
                  ) : (
                    <span className="text-xs text-red-600">
                      Subscription ended
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {sub.autoRenew === true && (
                    <p className="flex gap-2 items-center">
                      <Switch />
                      <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-xs">
                        Enable
                      </span>
                    </p>
                  )}
                  {sub.autoRenew === false && (
                    <p className="flex gap-2 items-center">
                      <Switch />
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                        Disable
                      </span>
                    </p>
                  )}
                  {sub.autoRenew === null && (
                    <p className="flex gap-2 items-center">
                      <Switch />
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                        Disable
                      </span>
                    </p>
                  )}
                </td>

                <td className="p-3 flex gap-3">
                  <button>
                    <IoEyeOutline />
                  </button>
                  <button>
                    <GoDownload />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
