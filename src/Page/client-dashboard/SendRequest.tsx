import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSendClientRequestMutation } from "@/redux/features/Client/Request.api";
import { useGetSubscriptionClientQuery } from "@/redux/features/Client/subscription.api";
import { useGetEmployeeTaskForClientQuery } from "@/redux/features/employee/task/task.api";

// Types
interface FormState {
  form_name: string;
  subscription: string;
  special_service: string;
  client_set_date: string;
  start_time: string;
  form_type: "makeup" | "checkout" | "other";
  description: string;
}

interface SubscriptionItem {
  id: number;
  status: string;
  plan: { name: string };
  building: { name: string };
  apartment: { apartment_number: string };
}

interface RootState {
  auth: { user?: { id: number } };
}

const initialFormState: FormState = {
  form_name: "",
  subscription: "",
  special_service: "",
  client_set_date: "",
  start_time: "",
  form_type: "makeup",
  description: "",
};

const SendRequest: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialFormState);

  const clientId = useSelector((state: RootState) => state.auth.user?.id);

  const { data: subscriptionList, isLoading: subsLoading } =
    useGetSubscriptionClientQuery();

  const { data: singleService, isLoading: serviceLoading } =
    useGetEmployeeTaskForClientQuery();

  const [sendClientRequest, { isLoading, isSuccess, isError }] =
    useSendClientRequestMutation();

  const activeSubscriptions: SubscriptionItem[] =
    subscriptionList?.filter((sub:any) => sub.status === "active") || [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: any = {
      form_name: form.form_name,
      subscription: Number(form.subscription),
      time_range: form.start_time,
      client_set_date: form.client_set_date,
      form_type: form.form_type,
      description: form.description,
      client: clientId,
    };

    if (form.special_service) {
      payload.special_service = Number(form.special_service);
    }

    try {
      await sendClientRequest(payload).unwrap();
      setForm(initialFormState);
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Send Request
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Request Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Request Name
            </label>
            <input
              type="text"
              name="form_name"
              value={form.form_name}
              onChange={handleChange}
              placeholder="Enter Your Request"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Subscription Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Subscription
            </label>
            {subsLoading ? (
              <p className="text-gray-500 py-2">Loading subscriptions...</p>
            ) : activeSubscriptions.length === 0 ? (
              <p className="text-yellow-600 py-2">No active subscriptions</p>
            ) : (
              <select
                name="subscription"
                value={form.subscription}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              >
                <option value="">Select Subscription</option>
                {activeSubscriptions.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.plan.name} - {sub.building.name} ({sub.apartment.apartment_number})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Special Service Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Special Service
            </label>

            {serviceLoading ? (
              <p className="text-gray-500 py-2">Loading services...</p>
            ) : (
              (() => {
                const activeTasks = (singleService || []).filter(
                  (task: any) => task.status !== "completed"
                );

                if (activeTasks.length === 0) {
                  return <p className="text-yellow-600 py-2">No active tasks available</p>;
                }

                return (
                  <select
                    name="special_service"
                    value={form.special_service}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="">Select Special Service</option>
                    {activeTasks.map((task: any) => (
                      <option key={task.id} value={task.id}>
                        {task.name} - {task.building_name} ({task.aprtment_number?.[0]})
                      </option>
                    ))}
                  </select>
                );
              })()
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Date</label>
              <input
                type="date"
                name="client_set_date"
                value={form.client_set_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Start Time</label>
              <input
                type="time"
                name="start_time"
                value={form.start_time}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
          </div>

          {/* Form Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Form Type</label>
            <select
              name="form_type"
              value={form.form_type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="makeup">Makeup</option>
              <option value="checkout">Checkout</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg text-white font-bold ${
              isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Sending..." : "Send Request"}
          </button>

          {isSuccess && <p className="text-green-600 text-center mt-2">✅ Request sent!</p>}
          {isError && <p className="text-red-600 text-center mt-2">❌ Failed to send.</p>}
        </form>
      </div>
    </div>
  );
};

export default SendRequest;
