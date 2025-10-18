import { FaPause } from "react-icons/fa";


type Subscription = {
  id: number;
  name: string;
  email: string;
  status: string;
  location: string;
  package: string;
  startDate: string;
  countdown: string;
  nextPayment: string;
  invoice: boolean;
};

type Props = {
  rows: Subscription[];
  page: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
};

export default function SubscriptionsTable({
  rows,
  page,
  pageSize,
  onPageChange,
}: Props) {
  const paged = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-gray-300 text-sm font-sans">
        <thead className="bg-gray-200 uppercase text-gray-700 tracking-wider">
          <tr>
            <th className="px-6 py-3 text-left">Client</th>
            <th className="px-6 py-3 text-left">Location</th>
            <th className="px-6 py-3 text-left">Package</th>
            <th className="px-6 py-3 text-left">Start Date</th>
            <th className="px-6 py-3 text-left">Countdown</th>
            <th className="px-6 py-3 text-left">Next Payment</th>
            <th className="px-6 py-3 text-left">Invoice</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {paged.map((sub, idx) => (
            <tr
              key={sub.id}
              className={`transition-colors duration-300 ${
                idx % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50`}
            >
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">{sub.name}</span>
                  <span className="text-xs text-gray-500">{sub.email}</span>
                  <span
                    className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                      sub.status === "Active"
                        ? "bg-gradient-to-r from-green-300 to-green-500 text-white"
                        : sub.status === "Pending"
                        ? "bg-gradient-to-r from-yellow-300 to-yellow-500 text-white"
                        : sub.status === "Auto-Renew"
                        ? "bg-gradient-to-r from-blue-300 to-blue-500 text-white"
                        : "bg-gradient-to-r from-red-300 to-red-500 text-white"
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-700">{sub.location}</td>
              <td className="px-6 py-4 text-gray-700">{sub.package}</td>
              <td className="px-6 py-4 text-gray-700">{sub.startDate}</td>
              {/* <td className="px-6 py-4 text-gray-700">{sub.countdown}</td> */}
              <td className="px-6 py-4 text-gray-700 text-center">
  {sub.countdown ? (
    <span>{sub.countdown}</span>
  ) : (
    <FaPause className="inline-block w-5 h-5 text-gray-400" />
  )}
</td>
              <td className="px-6 py-4 text-gray-700">{sub.nextPayment}</td>
              <td className="px-6 py-4">
                {sub.invoice ? (
                  <span className="px-3 py-1 text-blue-700 border border-blue-700 rounded-full text-xs font-semibold">
                   Prepaid
                  </span>
                ) : (
                  <span className="px-3 py-1 text-gray-400 border border-gray-300 rounded-full text-xs font-semibold">
                    Postpaid
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center text-md mt-3 px-2">
        <span>
          Showing {paged.length ? (page - 1) * pageSize + 1 : 0} to{" "}
          {(page - 1) * pageSize + paged.length} of {rows.length} results
        </span>
        <div className="space-x-2 space-y-3 px-2 py-2">
          <button
            className="px-3 py-1 border border-gray-300 rounded"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border border-gray-300  rounded"
            disabled={page * pageSize >= rows.length}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
