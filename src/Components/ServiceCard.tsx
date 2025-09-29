import { useEffect, useState } from "react";

interface Service {
  id: number;
  title: string;
  status: string;
  description: string;
  category: string;
  rating: number;
  duration: string;
  price: string;
  bookings: number;
  popularity: string;
  completionRate: {
    completed: number;
    total: number;
  };
  stats: {
    active: number;
    completed: number;
    revenue: string | number;
    rating: number;
  };
  keyFeatures: string[];
  includedItems: string[];
}

const ServiceCard = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{service.title}</h2>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-md">
                {service.status}
              </span>
              <p className="text-sm text-gray-500 mt-1">{service.description}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md">
                  {service.category}
                </span>
                <span>⭐ {service.rating}</span>
                <span>{service.duration}</span>
              </div>
            </div>
            <div className="text-right font-bold text-lg">{service.price}</div>
          </div>

          {/* Bookings & Popularity */}
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
            <span>👥 {service.bookings} bookings</span>
            <span>🔥 {service.popularity} popularity</span>
          </div>

          {/* Completion Rate */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Completion Rate:{" "}
              {service.completionRate.completed}/{service.completionRate.total}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${
                    (service.completionRate.completed /
                      service.completionRate.total) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-4 text-center text-sm">
            <div>
              <p className="font-semibold">{service.stats.active}</p>
              <p className="text-gray-500">Active</p>
            </div>
            <div>
              <p className="font-semibold">{service.stats.completed}</p>
              <p className="text-gray-500">Completed</p>
            </div>
            <div>
              <p className="font-semibold">{service.stats.revenue}</p>
              <p className="text-gray-500">Revenue</p>
            </div>
            <div>
              <p className="font-semibold">{service.stats.rating}</p>
              <p className="text-gray-500">Rating</p>
            </div>
          </div>

          {/* Key Features */}
          <div className="mt-4">
            <h4 className="font-medium text-sm">Key Features</h4>
            <div className="flex gap-2 flex-wrap mt-1">
              {service.keyFeatures.map((feature, idx) => (
                <span
                  key={idx}
                  className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-md"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Included Items */}
          <div className="mt-4">
            <h4 className="font-medium text-sm">Included Items</h4>
            <div className="flex gap-2 flex-wrap mt-1">
              {service.includedItems.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-md"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCard;
