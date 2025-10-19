
import Analytics from "@/Components/DashboardStatus/Analytics";
import DashboardStats from "@/Components/DashboardStatus/DashboardStatus";
import Report from "@/Components/DashboardStatus/Report";
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
     <div className="grid grid-cols-3 gap-4 py-10 ">
        {/* <div className="col-span-4">
          <Schedule></Schedule>
        </div> */}
        <div>
          <TopPerformers></TopPerformers>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
