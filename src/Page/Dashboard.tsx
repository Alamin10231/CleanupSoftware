import DashboardStats from "@/Components/DashboardStatus/DashboardStatus"
import Report from "@/Components/DashboardStatus/Report"
// import { Report } from "@/Components/DashboardStatus/Report"


const Dashboard = () => {
  return (
    <div>
      <div>
        <DashboardStats></DashboardStats>
        <Report></Report>
      </div>
    </div>
  )
}

export default Dashboard