import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Button } from "@/Components/ui/button";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Separator } from "@/Components/ui/separator";

// Dummy data for now
const dummyReports = [
  {
    id: "rpt-001",
    supervisor: "John Smith",
    employee: "Alice Johnson",
    employeeId: "emp-101",
    date: "2025-10-19",
    performance: "Excellent",
    workSummary: "Completed the assigned UI module and fixed layout bugs.",
    remarks: "Very dedicated and punctual today.",
  },
  {
    id: "rpt-002",
    supervisor: "John Smith",
    employee: "Mark Lee",
    employeeId: "emp-102",
    date: "2025-10-18",
    performance: "Good",
    workSummary: "Worked on backend API integration and wrote test cases.",
    remarks: "Needs slight improvement in meeting deadlines.",
  },
  {
    id: "rpt-003",
    supervisor: "Sarah Connor",
    employee: "Emma Brown",
    employeeId: "emp-103",
    date: "2025-10-18",
    performance: "Average",
    workSummary: "Tested new deployment pipeline.",
    remarks: "Still learning deployment flow, but progressing well.",
  },
];

const performanceColors: Record<string, string> = {
  Excellent: "bg-green-100 text-green-700 border-green-200",
  Good: "bg-blue-100 text-blue-700 border-blue-200",
  Average: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Poor: "bg-red-100 text-red-700 border-red-200",
};

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Supervisor Reports</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">All Reports</CardTitle>
        </CardHeader>

        <CardContent>
          <ScrollArea className="max-h-[70vh]">
            <div className="divide-y divide-gray-200">
              {dummyReports.map((report) => (
                <div
                  key={report.id}
                  className="flex justify-between items-center py-4 hover:bg-gray-50 px-2 rounded-lg transition"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">
                        {report.employee}
                      </h3>
                      <Badge
                        variant="outline"
                        className={performanceColors[report.performance]}
                      >
                        {report.performance}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Supervisor: {report.supervisor}
                    </p>
                    <p className="text-xs text-gray-500">
                      Date: {report.date}
                    </p>
                  </div>

                  <ReportDialog report={report} />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

interface Report {
  id: string;
  supervisor: string;
  employee: string;
  employeeId: string;
  date: string;
  performance: string;
  workSummary: string;
  remarks: string;
}

function ReportDialog({ report }: { report: Report }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Eye size={16} />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Report for {report.employee}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">
              <strong>Supervisor:</strong> {report.supervisor}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {report.date}
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-1 text-gray-700">Work Summary</h4>
            <p className="text-gray-700 text-sm">{report.workSummary}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-1 text-gray-700">Performance</h4>
            <Badge
              variant="outline"
              className={performanceColors[report.performance]}
            >
              {report.performance}
            </Badge>
          </div>

          <div>
            <h4 className="font-semibold mb-1 text-gray-700">Remarks</h4>
            <p className="text-gray-700 text-sm">{report.remarks}</p>
          </div>

          <div className="flex justify-end">
            <Button variant="outline">Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
