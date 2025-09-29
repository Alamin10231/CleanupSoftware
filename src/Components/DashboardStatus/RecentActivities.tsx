import { useState } from "react";
import Recentactivities from "../../assets/Dashboard/recent.svg";

interface Activity {
  id: number;
  text: string;
  emoji?: string;
  img?: string;
  date?: string;
}

const RecentActivities = () => {
  const [showAll, setShowAll] = useState(false);

  const activities: Activity[] = [
    { id: 1, text: "New client negotiation", img: Recentactivities },
    { id: 2, text: "New building added", img: Recentactivities },
    { id: 3, text: "Staff assigned", img: Recentactivities },
    { id: 4, text: "New client negotiation", img: Recentactivities },
    { id: 5, text: "Project started", img: Recentactivities },
    { id: 6, text: "Meeting scheduled", img: Recentactivities },
    { id: 7, text: "Project review", img: Recentactivities },
    { id: 8, text: "Client follow-up", img: Recentactivities },
  ];

  const visibleActivities = showAll ? activities : activities.slice(0, 7);

  return (
    <div className="flex space-x-4 border-gray-200 rounded-xl border">
      {/* Recent Activities Panel */}
      <div className="w-full rounded-lg p-4">
        <div className="flex justify-between items-center py-4 ">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <img src={Recentactivities} alt="" className="w-6 h-6" />
            Recent Activities
          </h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-500 text-sm underline"
          >
            {showAll ? "View less" : "View all"}
          </button>
        </div>

        {/* Scrollable List */}
        <ul
          className={` transition-all duration-300 ${
            showAll ? "max-h-10/12 mb-7  overflow-y-auto" : "h-9/12 mb-16  overflow-hidden"
          }`}
        >
          {visibleActivities.map((activity) => (
            <li key={activity.id} className="flex items-center ">
              {activity.img && (
                <img
                  src={activity.img}
                  alt=""
                  className="mr-2 w-10 h-10 p-2 bg-[#EFF5FF] rounded-full"
                />
              )}

              <span className="font-semibold ">{activity.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivities;
