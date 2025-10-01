

export default function BuildingTasks() {
  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6">
      {/* Left Section */}
      <div className="flex-1 space-y-4">
        {/* Header */}
        <h2 className="text-xl font-semibold">Building & Region Tasks</h2>

        {/* Search Input */}
        <div className="flex items-center bg-gray-100 rounded-md p-2">
          <input
            type="text"
            placeholder="Search Region/Building/Apartment"
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-full border text-sm">
            Assigned Only
          </button>
          <button className="px-3 py-1 rounded-full border text-sm">Status</button>
        </div>

        {/* Map Section */}
        <div className="relative w-full h-72 rounded-lg overflow-hidden border">
          <input
            type="text"
            placeholder="Search for a location"
            className="absolute top-3 left-1/2 -translate-x-1/2 w-[80%] bg-white shadow rounded-md px-3 py-2 text-sm outline-none"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/San_Francisco_Bay_Area_map.png/640px-San_Francisco_Bay_Area_map.png"
            alt="map"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-80 space-y-6">
        {/* Building Info */}
        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-lg">Building Info</h3>
          <div>
            <p className="text-gray-500 text-sm">Building Name</p>
            <p className="font-medium">The Grand Residences</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Address</p>
            <p className="font-medium">123 Oak Street, San Francisco</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Region</p>
            <p className="font-medium">Northwest</p>
          </div>
        </div>

        {/* Assigned Workers */}
        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-lg">Assigned Workers</h3>
          <div className="flex -space-x-3">
            <img
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://i.pravatar.cc/40?img=1"
              alt="worker1"
            />
            <img
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://i.pravatar.cc/40?img=2"
              alt="worker2"
            />
            <img
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://i.pravatar.cc/40?img=3"
              alt="worker3"
            />
          </div>
        </div>

        {/* Subscription Status */}
        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-lg">Subscription Status</h3>
          <div className="flex items-center gap-2">
            <input type="radio" checked readOnly />
            <div>
              <p className="font-medium">Premium Plan</p>
              <p className="text-sm text-green-600">Active</p>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white rounded-md py-2 text-sm">
            View Subscription
          </button>
        </div>
      </div>
    </div>
  );
}
