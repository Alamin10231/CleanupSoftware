import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetFormSubmissionsQuery } from "@/redux/features/admin/custom-form/custome-form.api";
import { ChevronDown, ChevronUp } from "lucide-react";

const FormSubmitted = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const { data: submissions, isLoading } = useGetFormSubmissionsQuery(currentPage);

  const toggleExpand = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderData = (data: Record<string, any>) => {
    if (!data || typeof data !== "object") return null;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-all"
          >
            <p className="text-sm font-semibold text-gray-700 capitalize">
              {key.replace(/_/g, " ")}:
            </p>
            <p className="text-sm text-gray-900 break-words">
              {Array.isArray(value)
                ? value.join(", ")
                : typeof value === "object"
                ? JSON.stringify(value)
                : value?.toString() || "—"}
            </p>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📋 Submitted Forms</h1>

      {submissions?.results?.length ? (
        <div className="space-y-4">
          {submissions.results.map((submission: any) => (
            <Card
              key={submission.id}
              className="border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              <CardHeader className="flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    {submission.form_name}
                    <Badge variant="secondary">{submission.response_user_name}</Badge>
                  </CardTitle>
                  <CardDescription>
                    Submitted at{" "}
                    <span className="font-medium text-gray-800">
                      {new Date(submission.submitted_at).toLocaleString()}
                    </span>
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleExpand(submission.id)}
                  className="flex items-center gap-1"
                >
                  {expandedRows.includes(submission.id) ? (
                    <>
                      Hide Details <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      View Details <ChevronDown size={16} />
                    </>
                  )}
                </Button>
              </CardHeader>

              {expandedRows.includes(submission.id) && (
                <CardContent>{renderData(submission.data)}</CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No form submissions found.</p>
      )}

      <div className="flex justify-end mt-6 gap-2">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!submissions?.previous}
        >
          Previous
        </Button>
        <Button
          variant="default"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!submissions?.next}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitted;
