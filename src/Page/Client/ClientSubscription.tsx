import { useGetSubscriptionClientQuery } from "@/redux/features/Client/subscription.api";
import React from "react";

interface Subscription {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
}

const ClientSubscription = () => {
  const { data, isLoading, error } = useGetSubscriptionClientQuery();
  console.log("API Data:", data);

  if (isLoading) return <p>Loading subscriptions...</p>;
  if (error) return <p>Error loading subscriptions</p>;

  const subscriptions: Subscription[] = (data || []).map((sub: any) => ({
    id: sub.id,
    name: sub.plan?.name || "No Plan Name",
    startDate: sub.start_date,
    endDate: sub.current_period_end,
    status: sub.status,
  }));

  if (subscriptions.length === 0) return <p>No subscriptions found</p>;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRemainingDays = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff : 0;
  };

  return (
    <div className="min-h-[85vh] bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Your Subscriptions</h1>
          <p className="text-gray-600">Manage your active and past subscriptions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {subscription.name}
              </h3>
              <p className="text-gray-500 mb-3">
                <span className="font-medium">Period:</span> {subscription.startDate} ~ {subscription.endDate}
              </p>
              <p className="text-gray-500 mb-3">
                <span className="font-medium">Remaining Days:</span> {getRemainingDays(subscription.endDate)}
              </p>
              <span
                className={`inline-block px-3 py-1 text-sm font-medium rounded ${getStatusColor(subscription.status)}`}
              >
                {subscription.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientSubscription;
