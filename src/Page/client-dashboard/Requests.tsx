
import React from 'react';

const Requests: React.FC = () => {
  // Dummy data for demonstration
  const requests = [
    {
      id: 1,
      requestType: 'Checkout',
      details: 'I am leaving the house for cleaning.',
      status: 'Pending',
    },
    {
      id: 2,
      requestType: 'Makeup',
      details: 'I am a renter and I am calling to clean.',
      status: 'In Progress',
    },
    {
      id: 3,
      requestType: 'Other Request',
      details: 'Deliver grocery.',
      status: 'Completed',
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Requests</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Request ID</th>
              <th className="py-2 px-4 border-b">Request Type</th>
              <th className="py-2 px-4 border-b">Details</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="py-2 px-4 border-b">{request.id}</td>
                <td className="py-2 px-4 border-b">{request.requestType}</td>
                <td className="py-2 px-4 border-b">{request.details}</td>
                <td className="py-2 px-4 border-b">{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
