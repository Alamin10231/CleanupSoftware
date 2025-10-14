import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ActionButton from "@/Components/ActionButton";
import Card from "@/Components/Card";
import ProgressBar from "@/Components/ProgressBar";
import EmployeeCard from "@/Components/EmployeeCard";
import { useEmployeeOverviewQuery } from "@/redux/api/apiSlice";

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
  taskCompletion: number;
  salary: string;
  performance: number;
  clientRating: number;
  punctuality: string;
  payments: number;
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [shiftFilter, setShiftFilter] = useState("All Shifts");

  // Fetch overview data from API
  const { data, error, isLoading } = useEmployeeOverviewQuery();

  useEffect(() => {
    fetch("/employee.json")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees.json:", err));
  }, []);

  
  const cardData = [
    {
      title: "Total Employee",
      number: data?.total_employee ?? 1,
      iconKey: "totalEmployee",
      iconAlt: "total employee",
    },
    {
      title: "Active",
      number: data?.active ?? 0,
      iconKey: "Active",
      iconAlt: "active",
    },
    {
      title: "Avg Performance",
      number: data?.average_performance ?? 0,
      iconKey: "AvgPerformance",
      iconAlt: "Avg Performance",
    },
    {
      title: "Total Payroll",
      number: data?.total_payroll ?? 0,
      iconKey: "totalpayroll",
      iconAlt: "Total Payroll",
    },
    {
      title: "On Leave",
      number: data?.leave ?? 0,
      iconKey: "onLeave",
      iconAlt: "On leave",
    },
  ];

  // Filter employees
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

    return (
      matchesSearch && matchesDepartment && matchesStatus && matchesShift
    );
  });

  return (
    <div className="h-screen flex flex-col mt-4">
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

        {/* Handle loading & error for cards */}
        {isLoading ? (
          <p className="text-gray-500 mt-6">Loading overview data...</p>
        ) : error ? (
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
            <option>HR</option>
            <option>Finance</option>
            <option>IT</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>
          <select
            value={shiftFilter}
            onChange={(e) => setShiftFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer"
          >
            <option>All Shifts</option>
            <option>Morning</option>
            <option>Evening</option>
            <option>Night</option>
          </select>
        </div>
      </div>

      {/* Scrollable Employee List */}
      <div className="flex-1 overflow-y-auto mt-6 pr-2 scrollbar-hide">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <EmployeeCard
              key={emp.id}
              name={emp.name}
              role={emp.role}
              tags={emp.tags}
              shifts={emp.shifts}
              email={emp.email}
              phone={emp.phone}
              location={emp.location}
              taskCompletion={emp.taskCompletion}
              salary={emp.salary}
              performance={emp.performance}
              clientRating={emp.clientRating}
              punctuality={emp.punctuality}
              payments={emp.payments}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No employees found.</p>
        )}
      </div>
    </div>
  );
};

export default Employees;
