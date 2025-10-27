import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetFormSubmissionsQuery } from "@/redux/features/admin/custom-form/custome-form.api";

const FormSubmitted = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: submissions, isLoading } =
    useGetFormSubmissionsQuery(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Renders dynamic form data as key-value rows inside the table cell
  const renderData = (data: Record<string, any>) => {
    if (!data || typeof data !== "object") return <p>—</p>;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex flex-col border-b pb-1">
            <span className="text-xs font-semibold text-gray-500 capitalize">
              {key.replace(/_/g, " ")}
            </span>
            <span className="text-sm text-gray-800 break-words">
              {Array.isArray(value)
                ? value.join(", ")
                : typeof value === "object"
                ? JSON.stringify(value)
                : value?.toString() || "—"}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading)
    return (
      <p className="text-center text-gray-500 mt-6">Loading submissions...</p>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6"> Submitted Forms</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[60px] text-gray-700 font-semibold">
                ID
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Form Name
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Submitted By
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Submitted At
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Data
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions?.results?.length ? (
              submissions.results.map((submission: any) => (
                <TableRow
                  key={submission.id}
                  className="hover:bg-gray-50 transition-all"
                >
                  <TableCell className="font-medium text-gray-700">
                    {submission.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {submission.form_name}
                  </TableCell>
                  <TableCell>
                    <div>
                      {submission.response_user_name} <br />
                      {submission.response_user_email &&
                        submission.response_user_email} <br />
                      {submission.response_user_prime_phone &&
                        submission.response_user_prime_phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(submission.submitted_at).toLocaleString()}
                  </TableCell>
                  <TableCell>{renderData(submission.data)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-gray-500 py-6"
                >
                  No form submissions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
