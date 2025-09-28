import { assets } from "@/assets/assets"
import ActionButton from "@/Components/ActionButton"
import Card from "@/Components/Card"
import ProgressBar from "@/Components/ProgressBar"

const Employees = () => {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#030229]">Employees</h1>
          <p className="text-gray-500 mt-2">Manage your workforce and track performance</p>
        </div>
        <ActionButton />
      </div>

      <ProgressBar />

      {/* Employee Card */}
      <div className="grid grid-cols-5 gap-4 mt-6">
        <Card title="Total Employee" number={10} iconSrc={assets.totalEmployee} iconAlt="total employee"/>
        <Card title="Active" number={51} iconSrc={assets.Active} iconAlt="active"/>
        <Card title="Avg Performance" number={12} iconSrc={assets.AvgPerformance} iconAlt="Avg Performance"/>
        <Card title="Total Payroll" number={12} iconSrc={assets.totalpayroll} iconAlt="Total Payroll"/>
        <Card title="On Leave" number={12} iconSrc={assets.onLeave} iconAlt="On leave"/>
      </div>

      {/* Search + Filters */}
      <div className="flex items-center gap-4 mt-8 p-9 bg-white border border-gray-300 rounded-xl shadow-md">
        {/* Search */}
        <input
          type="text"
          placeholder="Search buildings....."
          className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
        />

        {/* Dropdowns */}
        <select className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option>All Departments</option>
          <option>HR</option>
          <option>Finance</option>
          <option>IT</option>
        </select>

        <select className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option>All Status</option>
          <option>Active</option>
          <option>On Leave</option>
          <option>Inactive</option>
        </select>

        <select className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option>All Shifts</option>
          <option>Morning</option>
          <option>Evening</option>
          <option>Night</option>
        </select>

        <select className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 ml-auto">
          <option>Sort by Name</option>
          <option>Sort by Department</option>
          <option>Sort by Status</option>
        </select>
      </div>
    </div>
  )
}

export default Employees
