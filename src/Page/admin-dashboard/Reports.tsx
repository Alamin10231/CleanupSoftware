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
import { useGetAdminDashboardReportsQuery } from "@/redux/features/admin/reports/report.api";
 // ✅ correct path to your RTK slice

// Performance badge colors
const performanceColors: Record<string, string> = {
  Excellent: "bg-green-100 text-green-700 border-green-200",
  Good: "bg-blue-100 text-blue-700 border-blue-200",
  Average: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Poor: "bg-red-100 text-red-700 border-red-200",
};

export default function ReportsPage() {
  // Fetch data from API
  const { data, isLoading, isError, refetch } = useGetAdminDashboardReportsQuery();

  // Handle API states
  if (isLoading)
    return <div className="py-10 text-center text-gray-500">Loading reports…</div>;

  if (isError)
    return (
      <div className="py-10 text-center text-red-600">
        Failed to load reports.{" "}
        <button onClick={() => refetch()} className="underline text-blue-600">
          Retry
        </button>
      </div>
    );

  const reports = data?.results ?? [];

  if (!reports.length)
    return <div className="py-10 text-center text-gray-500">No reports found.</div>;

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
              {reports.map((report: any) => (
                <div
                  key={report.id}
                  className="flex justify-between items-center py-4 hover:bg-gray-50 px-2 rounded-lg transition"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">
                        {report.employee_name}
                      </h3>
                      <Badge
                        variant="outline"
                        className={
                          performanceColors[report.performance] ||
                          "bg-gray-100 text-gray-700 border-gray-200"
                        }
                      >
                        {report.performance}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Supervisor: {report.supervisor_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Date: {report.report_date}
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

// ----------------------------
// MODAL COMPONENT
// ----------------------------
function ReportDialog({ report }: { report: any }) {
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
            Report for {report.employee_name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">
              <strong>Supervisor:</strong> {report.supervisor_name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {report.report_date}
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-1 text-gray-700">Work Summary</h4>
            <p className="text-gray-700 text-sm">{report.work_summary}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-1 text-gray-700">Performance</h4>
            <Badge
              variant="outline"
              className={
                performanceColors[report.performance] ||
                "bg-gray-100 text-gray-700 border-gray-200"
              }
            >
              {report.performance}
            </Badge>
          </div>

          <div>
            <h4 className="font-semibold mb-1 text-gray-700">Supervisor Comments</h4>
            <p className="text-gray-700 text-sm">{report.supervisor_comments}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-1 text-gray-700">Issues Reported</h4>
            <p className="text-gray-700 text-sm">{report.issues_reported}</p>
          </div>

          <div className="flex justify-end">
            <Button variant="outline">Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
