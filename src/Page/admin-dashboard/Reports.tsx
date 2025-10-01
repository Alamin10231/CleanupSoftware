import PieReport from "@/Components/Reports/PieReport"
import Report from "@/Components/Reports/Report"
import ReportDashboard from "@/Components/Reports/ReportDashboard"
import ReportDetails from "@/Components/Reports/ReportDetails"

const Reports = () => {
  return (
    <div><Report></Report>
    
    <div className="grid grid-cols-2 gap-2">
     <div className="col-span-1 h-72 ">
       <ReportDashboard ></ReportDashboard>
     </div>
     <div className="col-span-1 h-72 ">
      <PieReport></PieReport>
     </div>
    
    </div>
    <div>
      <ReportDetails></ReportDetails>
    </div>
    
    </div>
  )
}

export default Reports