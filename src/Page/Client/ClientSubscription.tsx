import React from "react";

interface Employee {
  id: string;
  name: string;
  role: string;
  rating: number;
  avatar?: string;
}

interface Subscription {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Inactive";
  assignedEmployee: Employee | null;
  assignDate?: string;
  assignTime?: string;
}

// Mock data - replace with API call
const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    name: "Monthly Cleaning- A_204",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
    status: "Active",
    assignedEmployee: {
      id: "emp1",
      name: "Rahim U.",
      role: "Senior Cleaner",
      rating: 4.4,
    },
    assignDate: "11-11-2025",
    assignTime: "09:36 AM",
  },
  {
    id: "2",
    name: "Monthly Cleaning- A_204",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
    status: "Active",
    assignedEmployee: null,
  },
  {
    id: "3",
    name: "Monthly Cleaning- A_204",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
    status: "Active",
    assignedEmployee: {
      id: "emp2",
      name: "Rahim U.",
      role: "Senior Cleaner",
      rating: 4.4,
    },
    assignDate: "11-11-2025",
    assignTime: "09:36 AM",
  },
];

const ClientSubscription = () => {
  // TODO: Replace with actual API call
  // const fetchSubscriptions = async () => {
  //   const response = await fetch('/api/subscriptions');
  //   const data = await response.json();
  //   setSubscriptions(data);
  // };

  const subscriptions = mockSubscriptions;

  const handleOpenChat = (employeeId: string) => {
    // TODO: Implement chat functionality
    console.log("Open chat with employee:", employeeId);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-[85vh] bg-gray-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-600">Your Subscriptions</h1>
          <p className="text-gray-600 text-sm">Welcome to CleanUp Pro</p>
        </div>

        {/* Subscriptions List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Subscription
            </h2>
            <h2 className="text-lg font-semibold text-gray-800">
              Assign Employee
            </h2>
          </div>

          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start">
                {/* Left Side - Subscription Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    {subscription.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {subscription.startDate} ~ {subscription.endDate}
                  </p>
                  <span className="inline-block px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded">
                    {subscription.status}
                  </span>
                </div>

                {/* Right Side - Employee Info */}
                <div className="flex items-start gap-4">
                  {subscription.assignedEmployee ? (
                    <>
                      {/* Employee Avatar and Info */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {getInitials(subscription.assignedEmployee.name)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {subscription.assignedEmployee.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {subscription.assignedEmployee.role}
                          </p>
                          <p className="text-xs text-gray-500">
                            Rating: {subscription.assignedEmployee.rating}
                          </p>
                        </div>
                      </div>

                      {/* Assign Date and Actions */}
                      {/* Assign Date and Actions */}
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">
                          Assign date: {subscription.assignDate}
                        </p>
                        <p className="text-xs text-gray-500 mb-3">
                          {subscription.assignTime}
                        </p>
                        <div className="flex gap-5 mt-10">
                          <button
                            onClick={() =>
                              console.log(
                                "View profile:",
                                subscription.assignedEmployee!.id
                              )
                            }
                            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
                          >
                            View Profile
                          </button>
                          <button
                            onClick={() =>
                              handleOpenChat(subscription.assignedEmployee!.id)
                            }
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                          >
                            Open Chat
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* No Employee Assigned */
                    <div className="flex items-center justify-center h-full py-4">
                      <p className="text-sm font-medium text-gray-500">
                        No employee assigned
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientSubscription;
