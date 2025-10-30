
import React from 'react';

const AllRequests: React.FC = () => {
  // Dummy data for demonstration
  const allRequests = [
    {
      id: 1,
      requestType: 'Checkout',
      details: 'Client is leaving the house for cleaning.',
      status: 'Pending',
      clientName: 'John Doe',
      assignedEmployee: 'Alice',
    },
    {
      id: 2,
      requestType: 'Makeup',
      details: 'Client is a renter and is calling to clean.',
      status: 'In Progress',
      clientName: 'Jane Smith',
      assignedEmployee: 'Bob',
    },
    {
      id: 3,
      requestType: 'Other Request',
      details: 'Deliver grocery.',
      status: 'Completed',
      clientName: 'Sam Wilson',
      assignedEmployee: 'Alice',
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Client Requests</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Request ID</th>
              <th className="py-2 px-4 border-b">Client Name</th>
              <th className="py-2 px-4 border-b">Request Type</th>
              <th className="py-2 px-4 border-b">Details</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Assigned Employee</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {allRequests.map((request) => (
              <tr key={request.id}>
                <td className="py-2 px-4 border-b">{request.id}</td>
                <td className="py-2 px-4 border-b">{request.clientName}</td>
                <td className="py-2 px-4 border-b">{request.requestType}</td>
                <td className="py-2 px-4 border-b">{request.details}</td>
                <td className="py-2 px-4 border-b">{request.status}</td>
                <td className="py-2 px-4 border-b">{request.assignedEmployee}</td>
                <td className="py-2 px-4 border-b">
                  <select className="p-2 border rounded">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;
