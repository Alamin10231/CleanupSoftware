import { assets } from "@/assets/assets"
import ProgressBar from "@/Components/ProgressBar"

const Employees = () => {
  return (
    <div className="px-4 mt-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#030229]">Employees</h1>
          <p className="text-gray-500 mt-2">Manage your workforce and track performance</p>
        </div>
        <div className="flex gap-4">
          <button className="flex gap-2.5 bg-[#E5E5E5] py-2.5 px-5 rounded-full text-[#8E8E8E] cursor-pointer">
            <img src={assets.Refresh}/>
            Refresh
          </button>
          <button className="flex gap-2.5 text-white bg-[#009608] py-2.5 px-5 rounded-full cursor-pointer">
            <img src={assets.Bulk}/>
            Bulk
          </button>
          <button className="flex gap-2.5 text-white bg-[#2463EA] py-2.5 px-5 rounded-full cursor-pointer">
            <img src={assets.Add_Employee}/>
            Add Employee
          </button>
        </div>
      </div>

      <ProgressBar  />

    </div>
  )
}

export default Employees