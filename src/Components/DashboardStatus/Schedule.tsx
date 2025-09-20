import { useState } from "react";
export default function Schedule() {
  const [viewall, setviewall] = useState(false);
  interface schedule {
    id: number;
    title: string;
    date?: string;
    status?: string;
  }

  
  const scheduledServices: schedule[] = [
    {
      id: 1,
      title: "Air conditioner maintenance",
      date: "2025-09-21",
      status: "pending",
    },
    {
      id: 2,
      title: "Building inspection",
      date: "2025-09-22",
      status: "in-progress",
    },
    { id: 3, title: "Plumbing check", date: "2025-09-23", status: "completed" },
    {
      id: 4,
      title: "Elevator servicing",
      date: "2025-09-24",
      status: "pending",
    },
    {
      id: 5,
      title: "Fire safety audit",
      date: "2025-09-25",
      status: "pending",
    },
    {
      id: 6,
      title: "Meeting with contractor",
      date: "2025-09-26",
      status: "in-progress",
    },
  ];
  const slicepart = viewall?scheduledServices :scheduledServices.slice(0,6)

  return (
    <div>
      {/* Upcoming Services Panel */}
      <div className="w-full bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center py-2 mt-4">
          <h2 className="text-lg font-semibold">Upcoming Services</h2>
          <button
            className="text-blue-500 text-sm underline"
            onClick={() => setviewall(!viewall)}

          >
            {viewall?"Hide all ":"view all"}
          </button>
        </div>

     <ul className={viewall?"overflow-y-auto max-h-72":"overflow-hidden max-h-72"}>
         <div className="grid gap-4 sm:grid-cols-2">
  {slicepart.map((s) => (
    <div
      key={s.id}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{s.title}</h3>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full
            ${
              s.status === "completed"
                ? "bg-green-100 text-green-700"
                : s.status === "in-progress"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
            }`}
        >
          {s.status}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-500">📅 {s.date}</p>
    </div>
  ))}
</div>
     </ul>


        <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg mt-5">
          Schedule new service
        </button>
      </div>
    </div>
  );
}
