import React from 'react';

const dummyReports = [
  {
    id: 1,
    title: 'Weekly Maintenance Report',
    description: 'All maintenance tasks completed successfully.',
  },
  {
    id: 2,
    title: 'Client Complaint Report',
    description: 'Client in apartment 4B reported a leaky faucet.',
  },
];

const Reports = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Employee Reports</h1>

      <div className="bg-white rounded-lg border p-6">
        {dummyReports.map((report) => (
          <div key={report.id} className="border-b py-4">
            <h2 className="text-lg font-semibold">{report.title}</h2>
            <p className="text-gray-500">{report.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
