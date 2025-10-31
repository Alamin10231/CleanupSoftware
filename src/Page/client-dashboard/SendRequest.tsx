import React, { useState } from "react";

const SendRequest: React.FC = () => {
  const [form, setForm] = useState({
    requestType: "",
    details: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Send Request to Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label
            htmlFor="requestType"
            className="block text-gray-700 font-bold mb-2"
          >
            Request Type
          </label>
          <select
            id="requestType"
            name="requestType"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={form.requestType}
            onChange={handleChange}
          >
            <option value="checkout">Checkout</option>
            <option value="makeup">Makeup</option>
            <option value="other">Other Request</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="details"
            className="block text-gray-700 font-bold mb-2"
          >
            Details
          </label>
          <textarea
            id="details"
            name="details"
            rows={4}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Provide any additional details here."
            value={form.details}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send Request
        </button>
      </form>
    </div>
  );
};

export default SendRequest;
