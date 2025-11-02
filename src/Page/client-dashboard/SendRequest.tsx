import React, { useState } from "react";
import {
  useSendClientRequestMutation,
  useGetClientSubscriptionsQuery,
} from "@/redux/features/Client/Request.api";
import { useSelector } from "react-redux";

const SendRequest: React.FC = () => {
  const [form, setForm] = useState({
    form_name: "",
    subscription: "",
    special_service: "", // optional
    time_range: "",
    form_type: "makeup",
    description: "",
  });

  const clientId = useSelector((state: any) => state.auth.user?.id) || 148;

  const { data, isLoading: subsLoading, error } = useGetClientSubscriptionsQuery();
  const [sendClientRequest, { isLoading, isSuccess, isError }] =
    useSendClientRequestMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // prepare payload
      const payload: any = {
        ...form,
        client: clientId,
        subscription: Number(form.subscription),
      };

      // send special_service only if not empty
      if (form.special_service) {
        payload.special_service = Number(form.special_service);
      }

      const res = await sendClientRequest(payload).unwrap();
      console.log("✅ Request sent:", res);
      alert("Request sent successfully!");
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Failed to send request!");
    }
  };

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
              Form Name
            </label>
            <input
              type="text"
              name="form_name"
              value={form.form_name}
              onChange={handleChange}
              placeholder="Haircut"
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
              <p>Loading subscriptions...</p>
            ) : error ? (
              <p className="text-red-500">Failed to load subscriptions.</p>
            ) : (
              <select
                name="subscription"
                value={form.subscription}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Subscription</option>
                {Array.from(
                  new Set(
                    data?.results?.map((item: any) => item.subscription).filter(Boolean)
                  )
                ).map((subId: any) => {
                  const subItem = data.results.find((i: any) => i.subscription === subId);
                  return (
                    <option key={subId} value={subId}>
                      Subscription #{subId} - {subItem?.form_name || "Unnamed"}
                    </option>
                  );
                })}
              </select>
            )}
          </div>

          {/* Optional Special Service */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Special Service (Optional)
            </label>
            <select
              name="special_service"
              value={form.special_service}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">No special service</option>
              {Array.from(
                new Set(
                  data?.results
                    ?.map((item: any) => item.special_service)
                    .filter(Boolean)
                )
              ).map((serviceId: any) => (
                <option key={serviceId} value={serviceId}>
                  Special Service #{serviceId}
                </option>
              ))}
            </select>
          </div>

          {/* Time Range */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Time Range
            </label>
            <input
              type="text"
              name="time_range"
              value={form.time_range}
              onChange={handleChange}
              placeholder="14:00-15:00"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
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
              placeholder="Regular haircut"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg text-white font-bold transition-colors ${
              isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
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
