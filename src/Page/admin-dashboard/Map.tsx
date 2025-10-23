import { useState } from "react";
import { MapPin, Star, Bed, Home } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import WholeMap from "@/Components/map/WholeMap";

const MapRegionOverview = () => {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedWorkers, setSelectedWorkers] = useState("all");
  const [selectedApartment, setSelectedApartment] = useState(null);

  const regions = [
    {
      id: 1,
      name: "Region A - Downtown",
      buildings: 5,
      apartments: 150,
      color: "blue",
      properties: [
        {
          name: "Sunset Plaza",
          status: "active",
          building: "30 Building",
          manager: "John Smith",
          location: { lat: 24.89, lng: 91.87 },
        },
        {
          name: "Ocean View Tower",
          status: "pending",
          building: "45 Building",
          manager: "Sarah Johnson",
          location: { lat: 24.9, lng: 91.88 },
        },
        {
          name: "Metro Heights",
          status: "issues",
          building: "25 Building",
          manager: "Mike Davis",
          location: { lat: 24.89, lng: 91.89 },
        },
      ],
    },
    {
      id: 2,
      name: "Region B - Uptown",
      buildings: 3,
      apartments: 90,
      color: "blue",
      properties: [
        {
          name: "Sunset Plaza",
          status: "active",
          building: "30 Building",
          manager: "John Smith",
          location: { lat: 24.88, lng: 91.87 },
        },
        {
          name: "Ocean View Tower",
          status: "pending",
          building: "45 Building",
          manager: "Sarah Johnson",
          location: { lat: 24.87, lng: 91.88 },
        },
        {
          name: "Metro Heights",
          status: "issues",
          building: "25 Building",
          manager: "Mike Davis",
          location: { lat: 24.88, lng: 91.89 },
        },
      ],
    },
    {
      id: 3,
      name: "Region C - Suburbs",
      buildings: 4,
      apartments: 120,
      color: "blue",
      properties: [
        {
          name: "Sunset Plaza",
          status: "active",
          building: "30 Building",
          manager: "John Smith",
          location: { lat: 24.91, lng: 91.87 },
        },
        {
          name: "Ocean View Tower",
          status: "pending",
          building: "45 Building",
          manager: "Sarah Johnson",
          location: { lat: 24.92, lng: 91.88 },
        },
        {
          name: "Metro Heights",
          status: "issues",
          building: "25 Building",
          manager: "Mike Davis",
          location: { lat: 24.91, lng: 91.89 },
        },
      ],
    },
    {
      id: 4,
      name: "Region D - Suburbs",
      buildings: 4,
      apartments: 120,
      color: "blue",
      properties: [
        {
          name: "Sunset Plaza",
          status: "active",
          building: "30 Building",
          manager: "John Smith",
          location: { lat: 24.93, lng: 91.87 },
        },
        {
          name: "Ocean View Tower",
          status: "pending",
          building: "45 Building",
          manager: "Sarah Johnson",
          location: { lat: 24.94, lng: 91.88 },
        },
        {
          name: "Metro Heights",
          status: "issues",
          building: "25 Building",
          manager: "Mike Davis",
          location: { lat: 24.93, lng: 91.89 },
        },
      ],
    },
  ];

  const featuredProperties = [
    {
      id: 1,
      name: "Fully Furnished Smart Studio Apartment",
      rating: 4.8,
      location: "Downtown LA",
      bedrooms: 2,
      bathrooms: 2,
      type: "Entire Studio Apartment",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
    },
    {
      id: 2,
      name: "Furnished Apartment",
      rating: 4.2,
      location: "Echo Park",
      bedrooms: 3,
      bathrooms: 2,
      type: "Entire Studio Apartment",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
    },
    {
      id: 3,
      name: "Classic Studio Apartment",
      rating: 4.5,
      location: "Echo Park",
      bedrooms: 2,
      bathrooms: 1,
      type: "Entire Studio Apartment",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "issues":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-base font-semibold mb-3">Regions & Buildings</h2>

        {/* Region Cards */}
        <div className="flex gap-8 mb-6">
          {regions.map((region) => (
            <div
              key={region.id}
              className="bg-white rounded-lg border p-3 hover:shadow-md transition"
            >
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MapPin size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">
                            {region.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {region.buildings} Buildings • {region.apartments}{" "}
                            Apartments
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Buildings List (only for Region A) */}
                    {region.id === 1 && region.properties && (
                      <div className="mt-3 space-y-2 border-t pt-2">
                        {region.properties.map((property, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                            onClick={() => setSelectedApartment(property)}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${getStatusColor(
                                  property.status
                                )}`}
                              ></div>
                              <div>
                                <div className="text-xs font-medium">
                                  {property.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {property.building} • {property.status}
                                </div>
                              </div>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-xs font-medium">
                                {property.manager
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>

      {/* Main Map Area */}
      <div>
        <div className="bg-white rounded-lg border p-4 h-[680px] relative">
          <WholeMap selectedApartment={selectedApartment} />

          {/* Location Label */}
          <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg px-3 py-2">
            <div className="text-sm font-semibold">Los Angeles</div>
            <div className="text-xs text-gray-500">Downtown District</div>
          </div>
        </div>
      </div>
      {/* Featured Properties */}
      <div className="mt-6">
        <div className="space-y-3 grid grid-cols-4 gap-3">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition"
            >
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-24 object-cover"
              />
              <div className="p-3">
                <div className="font-semibold text-sm mb-1">
                  {property.name}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={12} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-medium">{property.rating}</span>
                  <span className="text-xs text-gray-500">
                    • {property.location}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Bed size={12} />
                    <span>{property.bedrooms} bedrooms</span>
                  </div>
                  <span>•</span>
                  <span>{property.bathrooms} bathrooms</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Home size={12} />
                  <span>{property.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapRegionOverview;
