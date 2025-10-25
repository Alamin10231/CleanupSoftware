import { Proportions } from "lucide-react";
import { lazy } from "react";

const EmployeeReports = lazy(() => import("@/Page/employee-dashboard/EmployeeReports"));

export const supervisorSidebarItems = [
   {
      title: "supervisor Reporting",
      item: [{
         title: "Reporting",
         url: "/supervisor/reporting",
         component: EmployeeReports,
         icon: Proportions,
         isActive: false
      }]
   }
]
