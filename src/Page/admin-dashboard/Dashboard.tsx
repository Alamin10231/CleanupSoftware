import Analytics from "@/Components/DashboardStatus/Analytics";
import DashboardStats from "@/Components/DashboardStatus/DashboardStatus";
import Report from "@/Components/DashboardStatus/Report";
import TopPerformers from "@/Components/DashboardStatus/TopPerformers";

const Dashboard = () => {
  return (
    <div className="space-y-10">
        <DashboardStats />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Report />
          <Analytics />
      </div>
     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* <div className="col-span-4">
          <Schedule></Schedule>
        </div> */}
          <TopPerformers  />
      </div>
    </div>
  );
};

export default Dashboard;
