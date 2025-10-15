import React from "react";

interface EmployeeCardProps {
  name: string;
  role: string;
  tags: string[];
  shifts: string[];
  email: string;
  phone: string;
  location: string;
  taskCompletion: number;
  salary: string;
  performance: number;
  clientRating: number;
  punctuality: string;
  payments: number;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  name,
  role,
  tags,
  shifts,
  email,
  phone,
  location,
  taskCompletion,
  salary,
  performance,
  clientRating,
  punctuality,

}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-5 bg-white shadow-sm mb-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
          {name.charAt(0)}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-600">{name}</h2>
          <p className="text-gray-500">{role}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded-full ${tag.toLowerCase() === "paid"
                    ? "bg-green-100 text-green-600"
                    : tag.toLowerCase() === "inactive"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Shifts */}
          <div className="flex gap-2 mt-2">
            {shifts.map((shift, i) => (
              <span
                key={i}
                className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
              >
                {shift}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-gray-500">
        <p>📧 {email}</p>
        <p>📞 {phone}</p>
        <p>📍 {location}</p>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-1">Task Completion</p>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{ width: `${taskCompletion}%` }}
          ></div>
        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 text-center mt-6 pt-4">
        <div>
          <p className="font-semibold text-gray-600">{salary}</p>
          <p className="text-xs text-gray-500">Monthly Salary</p>
        </div>
        <div>
          <p className="font-semibold text-gray-600">{performance}</p>
          <p className="text-xs text-gray-500">Performance</p>
        </div>
        <div>
          <p className="font-semibold text-gray-600">{clientRating}</p>
          <p className="text-xs text-gray-500">Client Rating</p>
        </div>
        <div>
          <p className="font-semibold text-gray-600">{punctuality}</p>
          <p className="text-xs text-gray-500">Punctuality</p>
        </div>
      </div>


    </div>
  );
};

export default EmployeeCard;
