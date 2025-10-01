import Report from "@/Components/Reports/Report"
import ReportDashboard from "@/Components/Reports/ReportDashboard"

const Reports = () => {
  return (
    <div><Report></Report>
    
    <div className="grid grid-cols-3 gap-2">
     <div className="col-span-1 h-72 ">
       <ReportDashboard ></ReportDashboard>
     </div>
     <div className="col-span-1 h-72 ">
       <ReportDashboard ></ReportDashboard>
     </div>
     <div className="col-span-1 h-72 ">
       <ReportDashboard ></ReportDashboard>
     </div>
    </div>
    
    </div>
  )
}

export default Reports