import { Star } from "lucide-react";
import { useEffect, useState } from "react";

type Performer = {
  id: number;
  name: string;
  role: string;
  rating: number; // e.g. 5.8
  services: number;
};

export default function TopPerformers() {
 
  const [performers, setPereformers] = useState<Performer[]>([]);
  useEffect(() => {
    fetch("/performers.json")
      .then((res) => res.json())
      .then((data) => {
        setPereformers(data);
      })
      .catch((err) => console.error("Error loading performers:", err));
  }, []);
 const [showAll,setShowAll] = useState(false)
  const visibleActivities = showAll?performers:performers.slice(0,3)
  return (
    <div className="w-full h-[440px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10m-9 4h10m-7 4h4"
            />
          </svg>
          <h2 className="font-semibold text-gray-800">Top Performers</h2>
        </div>
        <button className="text-sm text-blue-600 hover:underline" onClick={()=>setShowAll(!showAll)}>
          {
            showAll?"viewless ":"ViewAll"
          }
         
        </button>
      </div>

      {/* List */}
      <div className="mt-4 space-y-4">
        {visibleActivities.map((p: Performer) => {
          // convert rating (0–10) to percentage width
          const barWidth = Math.min((p.rating / 10) * 100, 100);

          return (
            <div key={p.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-700">
                  {p.name.split(" ")[0].slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{p.name}</p>
                  <p className="text-sm text-gray-500">{p.role}</p>
                  {/* Dynamic width bar */}
                  <div className="mt-1 h-1 w-36 rounded bg-gray-200">
                    <div
                      className="h-1 rounded bg-blue-500"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-blue-600">
                  <Star className="h-4 w-4 fill-blue-600 text-blue-600" />
                  <span className="font-medium">{p.rating}</span>
                </div>
                <p className="mt-1 text-xs text-blue-600">
                  {p.services} services
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
