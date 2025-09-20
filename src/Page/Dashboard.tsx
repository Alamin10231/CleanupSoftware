import Analytics from "@/Components/DashboardStatus/Analytics";
import DashboardStats from "@/Components/DashboardStatus/DashboardStatus";
import RecentActivities from "@/Components/DashboardStatus/RecentActivities";
import Report from "@/Components/DashboardStatus/Report";
import Schedule from "@/Components/DashboardStatus/Schedule";
// import { Report } from "@/Components/DashboardStatus/Report"

const Dashboard = () => {
  return (
    <div>
      <div>
        <DashboardStats></DashboardStats>
       
      </div>
      <div className="grid grid-cols-12 gap-4 mx-5">
         <div className="col-span-8  ">
          <Report></Report>
        </div>
        <div className="col-span-4">
          <Analytics />
        </div>
      </div>
     <div className="grid grid-cols-8 gap-4 mx-5 py-10">
         <div className="col-span-4  ">
           <RecentActivities></RecentActivities>
        </div>
        <div className="col-span-4 ">
          <Schedule></Schedule>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
  