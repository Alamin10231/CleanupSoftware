import Analytics from "@/Components/DashboardStatus/Analytics";
import DashboardOverview from "@/Components/DashboardStatus/DashboardOverview";
// import DashboardOverview from "@/Components/DashboardStatus/DashboardOverview";
import DashboardStats from "@/Components/DashboardStatus/DashboardStatus";
import RecentActivities from "@/Components/DashboardStatus/RecentActivities";
import Report from "@/Components/DashboardStatus/Report";
import Schedule from "@/Components/DashboardStatus/Schedule";
import TopPerformers from "@/Components/DashboardStatus/TopPerformers";


const Dashboard = () => {
  return (
    <div className="space-y-10">
      <div>
        <DashboardStats></DashboardStats>
      </div>
      <div className="grid grid-cols-12 gap-4">
         <div className="col-span-8">
          <Report></Report>
        </div>
        <div className="col-span-4">
          <Analytics />
        </div>
      </div>
     <div className="grid grid-cols-12 gap-4 py-10">
         <div className="col-span-4">
           <RecentActivities></RecentActivities>
        </div>
        <div className="col-span-4">
          <Schedule></Schedule>
        </div>
        <div className="col-span-4">
          <TopPerformers></TopPerformers>
        </div>
      </div>
        <div>
          <DashboardOverview></DashboardOverview>
        </div>
    </div>
  );
};

export default Dashboard;
