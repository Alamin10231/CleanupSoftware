import { useState, useMemo } from "react";
import { assets } from "@/assets/assets";
import ActionButton from "@/Components/ActionButton";
import Card from "@/Components/Card";
import ProgressBar from "@/Components/ProgressBar";
import {
  useEmployeeOverviewQuery,
  useGetAllemployeeAdminQuery,
} from "@/redux/api/apiSlice";

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  status: string;
  tags: string[];
  shifts: string[];
  email: string;
  phone: string;
  location: string;
  salary: string;
  performance: number;
  clientRating: number;
  punctuality: string;
  payments: number;
}

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [shiftFilter, setShiftFilter] = useState("All Shifts");
  const [page, setPage] = useState(1); // ✅ Use numeric pagination instead of URLs

  // Fetch overview data
  const {
    data: overviewData,
    error: overviewError,
    isLoading: overviewLoading,
  } = useEmployeeOverviewQuery();

  // Fetch paginated employee data
  const {
    data: employeeResponse,
    isLoading: employeesLoading,
    error: employeesError,
  } = useGetAllemployeeAdminQuery(page);

  // ✅ Extract page numbers from absolute URLs
  const getPageNumber = (url: string | null) => {
    if (!url) return null;
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1]) : null;
  };

  const nextPage = getPageNumber(employeeResponse?.next);
  const prevPage = getPageNumber(employeeResponse?.previous);

  const employees: Employee[] = useMemo(() => {
    if (!employeeResponse?.results) return [];

    return employeeResponse.results.map((emp: any) => {
      const profile = emp.employee_profile || {};

      return {
        id: emp.id,
        name: emp.name,
        role: profile.role || "N/A",
        department: profile.department || "N/A",
        status: profile.is_on_leave
          ? "On Leave"
          : emp.is_active
          ? "Active"
          : "Inactive",
        tags: [profile.department || "General"],
        shifts: [profile.shift || "N/A"],
        email: emp.email,
        phone: emp.prime_phone || profile.contact_number || "N/A",
        location: profile.location || "Unknown",
        salary: profile.base_salary ? `${profile.base_salary} BDT` : "0 BDT",
        performance: emp.tasks_completed || 0,
        clientRating: emp.client_rating || 0,
        punctuality: profile.is_on_leave ? "Low" : "High",
        payments: parseFloat(profile.base_salary || 0),
      };
    });
  }, [employeeResponse]);

  const filteredEmployees = employees.filter((emp) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      emp.name.toLowerCase().includes(search) ||
      emp.role.toLowerCase().includes(search) ||
      emp.email.toLowerCase().includes(search);

    const matchesDepartment =
      departmentFilter === "All Departments" ||
      emp.department === departmentFilter;

    const matchesStatus =
      statusFilter === "All Status" || emp.status === statusFilter;

    const matchesShift =
      shiftFilter === "All Shifts" || emp.shifts.includes(shiftFilter);

    return matchesSearch && matchesDepartment && matchesStatus && matchesShift;
  });

  const cardData = [
    {
      title: "Total Employee",
      number: overviewData?.total_employee ?? 0,
      iconKey: "totalEmployee",
      iconAlt: "total employee",
    },
    {
      title: "Active",
      number: overviewData?.active ?? 0,
      iconKey: "Active",
      iconAlt: "active",
    },
    {
      title: "Avg Performance",
      number: overviewData?.average_performance ?? 0,
      iconKey: "AvgPerformance",
      iconAlt: "Avg Performance",
    },
    {
      title: "Total Payroll",
      number: overviewData?.total_payroll ?? 0,
      iconKey: "totalpayroll",
      iconAlt: "Total Payroll",
    },
    {
      title: "On Leave",
      number: overviewData?.leave ?? 0,
      iconKey: "onLeave",
      iconAlt: "On leave",
    },
  ];

  return (
    <div className="h-screen flex flex-col mt-4 overflow-hidden">
      {/* Header Section */}
      <div className="flex-shrink-0">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#030229]">Employees</h1>
            <p className="text-gray-500 mt-2">
              Manage your workforce and track performance
            </p>
          </div>
          <ActionButton />
        </div>

        <ProgressBar />

        {/* Overview Cards */}
        {overviewLoading ? (
          <p className="text-gray-500 mt-6">Loading overview data...</p>
        ) : overviewError ? (
          <p className="text-red-500 mt-6">Failed to load overview data.</p>
        ) : (
          <div className="grid grid-cols-5 gap-4 mt-6">
            {cardData.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                number={card.number}
                iconSrc={assets[card.iconKey]}
                iconAlt={card.iconAlt}
              />
            ))}
          </div>
        )}

        {/* Search + Filters */}
        <div className="flex items-center gap-4 mt-8 p-6 bg-white border border-gray-300 rounded-xl shadow-sm">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
          >
            <option>All Departments</option>
            <option>Cleaning</option>
            <option>Security</option>
            <option>Maintenance</option>
            <option>HR</option>
            <option>Finance</option>
            <option>IT</option>
          </select>
          {/* <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select> */}
          <select
            value={shiftFilter}
            onChange={(e) => setShiftFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
          >
            <option>All Shifts</option>
            <option>morning</option>
            <option>evening</option>
            <option>night</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-y-auto mt-6 pr-2 scrollbar-hide">
        {employeesLoading ? (
          <p className="text-gray-500 text-center">Loading employees...</p>
        ) : employeesError ? (
          <p className="text-red-500 text-center">Failed to load employees.</p>
        ) : filteredEmployees.length > 0 ? (
          <>
            <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg shadow-sm mb-4">
              <table className="min-w-full border-collapse text-sm text-gray-600">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Tags</th>
                    <th className="px-4 py-3 text-left">Shifts</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Location</th>
                    <th className="px-4 py-3 text-left">Salary</th>
                    <th className="px-4 py-3 text-left">Performance</th>
                    <th className="px-4 py-3 text-left">Client Rating</th>
                    <th className="px-4 py-3 text-left">Punctuality</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-3 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                          {emp.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-700">{emp.name}</span>
                      </td>
                      <td className="px-4 py-3">{emp.role}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {emp.tags.map((tag, i) => (
                            <span
                              key={i}
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                tag.toLowerCase() === "paid"
                                  ? "bg-green-100 text-green-600"
                                  : tag.toLowerCase() === "inactive"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {emp.shifts.map((shift, i) => (
                            <span
                              key={i}
                              className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full"
                            >
                              {shift}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">{emp.email}</td>
                      <td className="px-4 py-3">{emp.phone}</td>
                      <td className="px-4 py-3">{emp.location}</td>
                      <td className="px-4 py-3">{emp.salary}</td>
                      <td className="px-4 py-3">{emp.performance}</td>
                      <td className="px-4 py-3">{emp.clientRating}</td>
                      <td className="px-4 py-3">{emp.punctuality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4 px-2">
              <button
                onClick={() => prevPage && setPage(prevPage)}
                disabled={!prevPage}
                className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium ${
                  prevPage
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Previous
              </button>

              <p className="text-gray-600 text-sm">
                Showing page{" "}
                <span className="font-semibold text-gray-800">{page}</span>
              </p>

              <button
                onClick={() => nextPage && setPage(nextPage)}
                disabled={!nextPage}
                className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium ${
                  nextPage
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">No employees found.</p>
        )}
      </div>
    </div>
  );
};

export default Employees;
