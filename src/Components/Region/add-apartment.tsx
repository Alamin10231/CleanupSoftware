import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import CustomMarker from "../map/CustomMarker";
import type { LatLng } from "@/Types/map.types";
import type { Building } from "@/Types/building.types";

// Minimal client type for this component's usage
type Client = {
  id: number;
  name: string;
  email?: string;
};
import { useGetSearchClientsQuery } from "@/redux/features/admin/users/clients.api";
import { useCreateApartmentMutation, useGetBuilidingBySearchQuery } from "@/redux/features/admin/buildings/building.api";
import { toast } from "sonner";

export default function AddApartment() {
  const [searchClient, setSearchClient] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [searchBuilding, setSearchBuilding] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null
  );
  const [showBuildingDropdown, setShowBuildingDropdown] = useState(false);

  const [location, setLocation] = useState<LatLng | null>(null);

  // Apartment form fields
  const [formData, setFormData] = useState({
    apartment_number: "",
    floor: "",
    living_rooms: "",
    bathrooms: "",
    outdoor_area: false,
  });

  const { data: clientsData } = useGetSearchClientsQuery(searchClient, {
    skip: searchClient.length < 2,
  });

  const { data: buildingsData } = useGetBuilidingBySearchQuery(searchBuilding, {
    skip: searchBuilding.length < 2,
  });
  const [addApartmentMutation] = useCreateApartmentMutation()

  // Handle outside clicks for dropdowns
  useEffect(() => {
    const handleClickOutside = () => {
      setShowClientDropdown(false);
      setShowBuildingDropdown(false);
    };
    if (showClientDropdown || showBuildingDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showClientDropdown, showBuildingDropdown]);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setSearchClient(client.name);
    setShowClientDropdown(false);
  };

  const handleBuildingSelect = (building: Building) => {
    setSelectedBuilding(building);
    setSearchBuilding(building.name);
    setShowBuildingDropdown(false);
    if (building.latitude && building.longitude) {
      setLocation({
        lat: parseFloat(building.latitude),
        lng: parseFloat(building.longitude),
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClient || !selectedBuilding) {
      alert("Please select both a client and building.");
      return;
    }

    const payload = {
      client: selectedClient.id,
      building_id: selectedBuilding.id,
      apartment_number: formData.apartment_number,
      floor: Number(formData.floor),
      living_rooms: Number(formData.living_rooms),
      bathrooms: Number(formData.bathrooms),
      outdoor_area: formData.outdoor_area,
      location: selectedBuilding.location || "Unknown",
    };

    console.log("Submitting apartment:", payload);
    try {
      await addApartmentMutation(payload).unwrap();
      toast.success("Apartment created successfully!");
      setFormData({
         apartment_number: "",
         floor: "",
         living_rooms: "",
         bathrooms: "",
         outdoor_area: false,
      });
    } catch (error) {
      toast.error("Failed to create apartment.");
      console.error("Error creating apartment:", error);
    }
    // Here you can call your createApartment mutation or API
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 9.75L12 3l9 6.75M4.5 10.5V20a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5V10.5M9 21V13h6v8"
            />
          </svg>
          Add Apartment
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white border-0 rounded-lg max-w-6xl">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="bg-gradient-to-r from-[#0a078f] via-[#8241ed] to-[#2463ea] bg-clip-text text-transparent font-semibold text-2xl">
            Add New Apartment
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Left side form */}
            <div className="space-y-4">
              {/* Client Search */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client *
                </label>
                <input
                  type="text"
                  value={searchClient}
                  onChange={(e) => {
                    setSearchClient(e.target.value);
                    setShowClientDropdown(true);
                    if (!e.target.value) setSelectedClient(null);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (clientsData?.results?.length > 0)
                      setShowClientDropdown(true);
                  }}
                  className="block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search by name or email..."
                />

                {showClientDropdown && clientsData?.results?.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {clientsData.results.map((client: Client) => (
                      <div
                        key={client.id}
                        className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100"
                        onClick={() => handleClientSelect(client)}
                      >
                        <div className="font-medium text-gray-900">
                          {client.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {client.email}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Building Search */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Building *
                </label>
                <input
                  type="text"
                  value={searchBuilding}
                  onChange={(e) => {
                    setSearchBuilding(e.target.value);
                    setShowBuildingDropdown(true);
                    if (!e.target.value) setSelectedBuilding(null);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (buildingsData?.results?.length > 0)
                      setShowBuildingDropdown(true);
                  }}
                  className="block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search by location or name..."
                />

                {showBuildingDropdown && buildingsData?.results?.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {buildingsData.results.map((building: Building) => (
                      <div
                        key={building.id}
                        className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100"
                        onClick={() => handleBuildingSelect(building)}
                      >
                        <div className="font-medium text-gray-900">
                          {building.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {building.location}, {building.city}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Apartment Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apartment Number *
                  </label>
                  <input
                    type="text"
                    name="apartment_number"
                    value={formData.apartment_number}
                    onChange={handleChange}
                    placeholder="e.g. A-203"
                    className="block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Floor *
                  </label>
                  <input
                    type="number"
                    name="floor"
                    value={formData.floor}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                    className="block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Living Rooms *
                  </label>
                  <input
                    type="number"
                    name="living_rooms"
                    value={formData.living_rooms}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                    className="block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms *
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="e.g. 1"
                    className="block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Outdoor Area */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="outdoor_area"
                  checked={formData.outdoor_area}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-700">Outdoor area</label>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-[500px] rounded-md border border-gray-300 overflow-hidden">
              <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <Map
                  defaultZoom={12}
                  center={location || { lat: 24.7136, lng: 46.6753 }}
                  mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
                  gestureHandling="greedy"
                  disableDefaultUI
                >
                  {location && (
                    <AdvancedMarker position={location}>
                      <CustomMarker />
                    </AdvancedMarker>
                  )}
                </Map>
              </APIProvider>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-4 px-6 flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              + Create
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
