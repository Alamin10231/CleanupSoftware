import { useState } from "react";
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
import { useGetSupervisorReportsQuery } from "@/redux/features/admin/Report/supervisorReport.api";

const performanceColors: Record<string, string> = {
  Excellent: "bg-green-100 text-green-700 border-green-200",
  Good: "bg-blue-100 text-blue-700 border-blue-200",
  Average: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Poor: "bg-red-100 text-red-700 border-red-200",
};

export default function ReportsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetSupervisorReportsQuery(page);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10">Something went wrong!</p>;

  const reports = data?.results || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Supervisor Reports</h1>

      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">All Reports</CardTitle>
        </CardHeader>

        <CardContent>
          <ScrollArea className="max-h-[70vh]">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700">Employee</th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700">Supervisor</th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700">Performance</th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report: any, idx: number) => (
                  <tr
                    key={report.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2">{report.employee_name}</td>
                    <td className="px-4 py-2">{report.supervisor_name}</td>
                    <td className="px-4 py-2">{report.report_date}</td>
                    <td className="px-4 py-2">
                      <Badge
                        variant="outline"
                        className={performanceColors[report.performance]}
                      >
                        {report.performance}
                      </Badge>
                    </td>
                    <td className="px-4 py-2">
                      <ReportDialog report={report} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <Button
              disabled={!data?.previous}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              Previous
            </Button>
            <span className="text-gray-600">
              Page {page}
            </span>
            <Button
              disabled={!data?.next}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ReportDialog({ report }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Eye size={16} /> View
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-800">
            Report for {report.employee_name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
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

          {report.report_summary && (
            <div>
              <h4 className="font-semibold mb-1 text-gray-700">Report Summary</h4>
              <p className="text-gray-700 text-sm">{report.report_summary}</p>
            </div>
          )}

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
            <h4 className="font-semibold mb-1 text-gray-700">Supervisor Comments</h4>
            <p className="text-gray-700 text-sm">{report.supervisor_comments}</p>
          </div>

          {report.issues_reported && (
            <div>
              <h4 className="font-semibold mb-1 text-gray-700">Issues Reported</h4>
              <p className="text-gray-700 text-sm">{report.issues_reported}</p>
            </div>
          )}

          
        </div>
      </DialogContent>
    </Dialog>
  );
}
