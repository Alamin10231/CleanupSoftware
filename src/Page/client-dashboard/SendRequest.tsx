import React, { useState } from "react";
import {
  useSendClientRequestMutation,
} from "@/redux/features/Client/Request.api";
import { useSelector } from "react-redux";
import { useGetSubscriptionClientQuery } from "@/redux/features/Client/subscription.api";

// Define types
interface FormState {
  form_name: string;
  subscription: string;
  special_service: string;
  start_time: string;
  end_time: string;
  form_type: "makeup" | "checkout" | "other";
  description: string;
}

interface Subscription {
  id: number;
  status: string;
  plan: {
    name: string;
  };
  building: {
    name: string;
  };
  apartment: {
    apartment_number: string;
  };
}

interface RootState {
  auth: {
    user?: {
      id: number;
    };
  };
}

const SendRequest: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    form_name: "",
    subscription: "",
    special_service: "",
    start_time: "",
    end_time: "",
    form_type: "makeup",
    description: "",
  });

  const clientId = useSelector((state: RootState) => state.auth.user?.id);

  // Using the correct query hook
  const { data, isLoading: subsLoading, error } = useGetSubscriptionClientQuery();
  
  const [sendClientRequest, { isLoading, isSuccess, isError }] = useSendClientRequestMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Format time range as "HH:MM-HH:MM"
      const time_range = `${form.start_time}-${form.end_time}`;
      
      const payload: any = {
        form_name: form.form_name,
        subscription: Number(form.subscription),
        time_range: time_range,
        form_type: form.form_type,
        description: form.description,
        client: clientId,
      };

      // Add special_service only if selected
      if (form.special_service) {
        payload.special_service = Number(form.special_service);
      }

      const res = await sendClientRequest(payload).unwrap();
      console.log("✅ Request sent:", res);
      
      // Reset form on success
      setForm({
        form_name: "",
        subscription: "",
        special_service: "",
        start_time: "",
        end_time: "",
        form_type: "makeup",
        description: "",
      });
    } catch (error: any) {
      console.error("❌ Error:", error);
    }
  };

  // Get active subscriptions from the API response
  const activeSubscriptions: Subscription[] = 
    data?.filter((sub: Subscription) => sub.status === "active") || [];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Send Request
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Form Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Request
            </label>
            <input
              type="text"
              name="form_name"
              value={form.form_name}
              onChange={handleChange}
              placeholder="Enter Your Request"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Subscription */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Subscription
            </label>
            {subsLoading ? (
              <p className="text-gray-500 py-2">Loading subscriptions...</p>
            ) : error ? (
              <p className="text-red-500 py-2">Failed to load subscriptions.</p>
            ) : activeSubscriptions.length === 0 ? (
              <p className="text-yellow-600 py-2">No active subscriptions found.</p>
            ) : (
              <select
                name="subscription"
                value={form.subscription}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

          {/* Time Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Start Time
              </label>
              <input
                type="time"
                name="start_time"
                value={form.start_time}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                End Time
              </label>
              <input
                type="time"
                name="end_time"
                value={form.end_time}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Form Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Form Type
            </label>
            <select
              name="form_type"
              value={form.form_type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="makeup">Makeup</option>
              <option value="checkout">Checkout</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Give us in details"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg text-white font-bold transition-colors ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Sending..." : "Send Request"}
          </button>

          {isSuccess && (
            <p className="text-green-600 text-center font-semibold mt-2">
              ✅ Request sent successfully!
            </p>
          )}
          {isError && (
            <p className="text-red-600 text-center font-semibold mt-2">
              ❌ Failed to send request.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SendRequest;