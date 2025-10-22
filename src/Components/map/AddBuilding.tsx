import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import CustomMarker from "./CustomMarker";
import type { LatLng } from "@/Types/map.types";
import { Plus } from "lucide-react";
import { useCreateBuildingMutation } from "@/redux/features/admin/buildings/building.api";
import { toast } from "sonner";
import { useSearchRegionQuery } from "@/redux/features/admin/regions/regions.api";

export default function AddBuilding() {
  const [searchRegion, setSearchRegion] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<LatLng | null>({
    lat: 24.7136,
    lng: 46.6753,
  });
  const [createBuilding] = useCreateBuildingMutation();
  const { data: regions, isLoading } = useSearchRegionQuery(searchRegion, {
    skip: searchRegion.length < 2,
  });

  const getAddress = async ({ lat, lng }) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }`
    );
    const data = await res.json();
    const address = data.results[0].formatted_address;
    return address;
  };

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    city: "",
    region: null,
    location: "",
    latitude: null,
    longitude: null,
  });

  const isFormValid =
    formData.name.trim() &&
    formData.type.trim() &&
    formData.city.trim() &&
    formData.region &&
    formData.location.trim() &&
    formData.latitude !== null &&
    formData.longitude !== null;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleRegionSelect = (region: { id: number }) => {
    setSelectedRegion(region.id);
    setShowRegionDropdown(false);
  };
  const handleMapClick = (e: any) => {
    const lat = e.detail.latLng.lat;
    const lng = e.detail.latLng.lng;
   getAddress({ lat, lng }).then((addr) => setAddress(addr))
    setLocation({ lat, lng });
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      createBuilding(formData).unwrap();
      toast.success("Building created successfully!");
      setFormData({
        name: "",
        type: "",
        city: "",
        region: null,
        location: "",
        latitude: null,
        longitude: null,
      });
      setLocation(null);
      console.log("Submitting building:", formData);
    } catch (error) {
      toast.error("Failed to create building.");
      console.error("Error creating building:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Building
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white border-0 rounded-lg max-w-6xl">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="bg-gradient-to-r from-[#0a078f] via-[#8241ed] to-[#2463ea] bg-clip-text text-transparent font-semibold text-2xl">
            Add New Building
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Left side form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Building Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Building Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Region *
                  </label>
                  <input
                    type="text"
                    value={searchRegion}
                    onChange={(e) => {
                      setSearchRegion(e.target.value);
                      setShowRegionDropdown(true);
                      if (!e.target.value) setSelectedRegion(null);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (regions?.results?.length > 0)
                        setShowRegionDropdown(true);
                    }}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  />
                  {showRegionDropdown && regions?.results?.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {regions.results.map((region: any) => (
                        <div
                          key={region.id}
                          className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100"
                          onClick={() => {
                            setSelectedRegion(region.id);
                            setSearchRegion(region.name);
                            setFormData((prev) => ({
                              ...prev,
                              region: region.id,
                            }));
                            setShowRegionDropdown(false);
                          }}
                        >
                          <div className="font-medium text-gray-900">
                            {region.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location / Address *
                </label>
                <input
                  type="text"
                  name="location"
                  value={address}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
            </div>

            {/* Right side map */}
            <div className="w-full h-[500px] rounded-md border border-gray-300 overflow-hidden">
              <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <Map
                  defaultZoom={12}
                  defaultCenter={location || { lat: 24.7136, lng: 46.6753 }}
                  mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
                  gestureHandling="greedy"
                  disableDefaultUI
                  onClick={handleMapClick}
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
            <Button type="submit" disabled={!isFormValid}>
              <Plus /> Create Building
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
