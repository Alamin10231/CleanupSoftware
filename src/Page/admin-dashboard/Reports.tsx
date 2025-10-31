import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  User,
  ClipboardList,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";
import { useGetReportsQuery } from "@/redux/features/admin/reports/reports.api";

interface Report {
  id: number;
  supervisor: number;
  supervisor_name: string;
  supervisor_mail: string;
  employee: number;
  employee_name: string;
  employee_mail: string;
  report_date: string;
  work_summary: string;
  report_summary: string | null;
  performance: string;
  supervisor_comments: string;
  issues_reported: string;
  created_at: string;
  last_updated: string;
}

const ReportsListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [performanceFilter, setPerformanceFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Build query parameters
  const buildQueryParams = () => {
    const params: Record<string, string | number> = {
      page: currentPage,
    };

    if (debouncedSearch) {
      params.search = debouncedSearch;
    }

    if (performanceFilter && performanceFilter !== "all") {
      params.performance = performanceFilter;
    }

    if (dateFilter) {
      params.report_date = dateFilter;
    }

    return params;
  };

  // Fetch reports with filters
  const queryString = new URLSearchParams(
    Object.entries(buildQueryParams()).reduce((acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const { data: reportsData, isLoading: reportsLoading } = useGetReportsQuery(
    queryString
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [performanceFilter, dateFilter]);

  const reports = reportsData?.results || [];
  const totalPages = reportsData?.total_pages || 1;
  const totalCount = reportsData?.count || 0;

  const handleViewDetails = (report: Report) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setDebouncedSearch("");
    setPerformanceFilter("all");
    setDateFilter("");
    setCurrentPage(1);
  };

  const hasActiveFilters = debouncedSearch || (performanceFilter && performanceFilter !== "all") || dateFilter;

  const getPerformanceBadge = (performance: string | null) => {
   if(!performance) return <Badge>N/A</Badge>
    const variants: Record<string, { variant: any; className: string }> = {
      excellent: {
        variant: "default",
        className: "bg-green-500 hover:bg-green-600",
      },
      good: { variant: "default", className: "bg-blue-500 hover:bg-blue-600" },
      average: {
        variant: "default",
        className: "bg-yellow-500 hover:bg-yellow-600",
      },
      poor: { variant: "default", className: "bg-red-500 hover:bg-red-600" },
    };

    const config = variants[performance.toLowerCase()] || variants.average;

    return (
      <Badge variant={config.variant} className={config.className}>
        {performance}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className="min-w-[40px]"
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Work Reports</h1>
        <p className="text-sm text-gray-500 mt-1">
          View and manage employee work reports and performance evaluations
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm">
              Search
            </Label>
            <div className="relative">
              <Input
                id="search"
                placeholder="Search by name or summary..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
          </div>

          {/* Performance Filter */}
          <div className="space-y-2">
            <Label htmlFor="performance" className="text-sm">
              Performance
            </Label>
            <Select
              value={performanceFilter}
              onValueChange={setPerformanceFilter}
            >
              <SelectTrigger id="performance">
                <SelectValue placeholder="All Performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Performance</SelectItem>
                <SelectItem value="Excellent">Excellent</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Average">Average</SelectItem>
                <SelectItem value="Poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Filter */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm">
              Report Date
            </Label>
            <Input
              id="date"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter size={16} />
              <span className="font-medium">Active Filters:</span>
              <span>{totalCount} reports found</span>
              <Button
                variant="link"
                size="sm"
                onClick={handleClearFilters}
                className="ml-auto"
              >
                Clear All
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Reports Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        {reportsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-gray-400" size={32} />
            <span className="ml-3 text-gray-500">Loading reports...</span>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Supervisor</TableHead>
                  <TableHead>Report Date</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Issues</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">
                        #{report.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {report.employee_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {report.employee_mail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {report.supervisor_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {report.supervisor_mail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(report.report_date)}</TableCell>
                      <TableCell>
                        {getPerformanceBadge(report.performance)}
                      </TableCell>
                      <TableCell>
                        {report.issues_reported !== "None" &&
                        report.issues_reported ? (
                          <div className="flex items-center gap-1 text-amber-600">
                            <AlertCircle size={14} />
                            <span className="text-xs">Has Issues</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">
                            No Issues
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(report)}
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-gray-500"
                    >
                      No reports found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t">
                <div className="text-sm text-gray-500">
                  Showing page {currentPage} of {totalPages} ({totalCount}{" "}
                  total reports)
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    Previous
                  </Button>

                  {renderPaginationButtons()}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Report Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Report Details - #{selectedReport?.id}</DialogTitle>
            <DialogDescription>
              Detailed view of the work report and performance evaluation
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                      <User size={14} />
                      EMPLOYEE
                    </div>
                    <div className="font-medium">
                      {selectedReport.employee_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedReport.employee_mail}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                      <User size={14} />
                      SUPERVISOR
                    </div>
                    <div className="font-medium">
                      {selectedReport.supervisor_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedReport.supervisor_mail}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                      <Calendar size={14} />
                      REPORT DATE
                    </div>
                    <div className="font-medium">
                      {formatDate(selectedReport.report_date)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">
                      PERFORMANCE
                    </div>
                    <div>
                      {getPerformanceBadge(selectedReport.performance)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="space-y-4">
                  {/* Work Summary */}
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                      <ClipboardList size={14} />
                      WORK SUMMARY
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md text-sm">
                      {selectedReport.work_summary}
                    </div>
                  </div>

                  {/* Report Summary */}
                  {selectedReport.report_summary && (
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-2">
                        REPORT SUMMARY
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md text-sm">
                        {selectedReport.report_summary}
                      </div>
                    </div>
                  )}

                  {/* Supervisor Comments */}
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-2">
                      SUPERVISOR COMMENTS
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md text-sm border border-blue-100">
                      {selectedReport.supervisor_comments}
                    </div>
                  </div>

                  {/* Issues Reported */}
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                      <AlertCircle size={14} />
                      ISSUES REPORTED
                    </div>
                    <div
                      className={`p-3 rounded-md text-sm ${
                        selectedReport.issues_reported !== "None" &&
                        selectedReport.issues_reported
                          ? "bg-amber-50 border border-amber-200"
                          : "bg-gray-50"
                      }`}
                    >
                      {selectedReport.issues_reported || "No issues reported"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="border-t pt-4 grid grid-cols-2 gap-4 text-xs text-gray-500">
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {formatDateTime(selectedReport.created_at)}
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span>{" "}
                  {formatDateTime(selectedReport.last_updated)}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportsListPage;
