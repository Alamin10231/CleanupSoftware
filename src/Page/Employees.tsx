import ActionButton from "@/Components/ActionButton"
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

    </div>
  )
}

export default Employees