import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState, useEffect, useCallback } from "react";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { Edit2, MapIcon, Pencil, Plus, Trash2 } from "lucide-react";
import {
  useUpdateBuildingMutation,
  useGetApartmentsQuery,
} from "@/redux/features/admin/buildings/building.api";
import { toast } from "sonner";
import { useSearchRegionQuery } from "@/redux/features/admin/regions/regions.api";
import type { LatLng } from "@/Types/map.types";
import type { Building } from "@/Types/building.types";

type Region = { id: number; name: string };
type Apartment = { apartment_number: string; floor: number; status: "active" | "inactive" };

type BuildingFormData = {
  name: string;
  type: string;
  city: string;
  region: number | null;
  location: string;
  latitude: number | null;
  longitude: number | null;
};

// const DEFAULT_MAP_CENTER: LatLng = { lat: 24.7136, lng: 46.6753 };

const BUILDING_TYPES = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
];

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string | number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && "*"}
      </label>
      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

interface UpdateBuildingProps {
  building: Building;
  refetch?: () => void;
}

export default function UpdateBuilding({ building, refetch }: UpdateBuildingProps) {
  const [open, setOpen] = useState(false);
  const [searchRegion, setSearchRegion] = useState(building.region_name);
  const [formData, setFormData] = useState<BuildingFormData>({
    name: building.name,
    type: building.type,
    city: building.city,
    region: building.region,
    location: building.location,
    latitude: building.latitude,
    longitude: building.longitude,
  });
  const [location, setLocation] = useState<LatLng>({
    lat: building.latitude,
    lng: building.longitude,
  });
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const [updateBuilding, { isLoading: isUpdating }] = useUpdateBuildingMutation();
  const { data: regions } = useSearchRegionQuery(searchRegion, { skip: searchRegion.length < 2 });
  const { data: existingApartments, refetch: refetchApartments } =
    useGetApartmentsQuery(building.id, { skip: !open });

  useEffect(() => {
    if (existingApartments) {
      setApartments(existingApartments.results);
    }
  }, [existingApartments]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleMapClick = useCallback((e: any) => {
    const lat = e.detail.latLng.lat;
    const lng = e.detail.latLng.lng;
    setLocation({ lat, lng });
    setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }));
  }, []);

  const addApartment = () => {
    setApartments([...apartments, { apartment_number: "", floor: 0, status: "active" }]);
  };

  const removeApartment = (index: number) => {
    setApartments(apartments.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isFormValid =
      formData.name && formData.city && formData.location && formData.region && formData.latitude && formData.longitude;
    if (!isFormValid) return toast.error("Please fill in all required fields.");

    try {
      await updateBuilding({ id: building.id, data: { ...formData, apartments } }).unwrap();
      toast.success("Building updated successfully!");
      setOpen(false);
      refetch?.();
      refetchApartments();
    } catch (error) {
      toast.error("Failed to update building.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="text-blue-600 hover:text-blue-800">
          <Pencil className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white border-0 rounded-lg max-w-6xl">
        <DialogHeader className="border-b border-gray-200 pb-4 flex items-center gap-2">
          <Edit2 className="w-6 h-6 text-blue-700" />
          <DialogTitle className="bg-gradient-to-r from-[#0a078f] via-[#8241ed] to-[#2463ea] bg-clip-text text-transparent font-semibold text-2xl">
            Update Building
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
              <FormInput
                label="Building Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter building name"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Building Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {BUILDING_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <FormInput
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
              />

              <FormInput
                label="Location / Address"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Click on map to set location"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Latitude"
                  name="latitude"
                  type="number"
                  value={formData.latitude}
                  onChange={handleChange}
                />
                <FormInput
                  label="Longitude"
                  name="longitude"
                  type="number"
                  value={formData.longitude}
                  onChange={handleChange}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Apartments</h3>
                {apartments.map((apt, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 mb-2 p-2 border rounded-md"
                  >
                    <input
                      type="text"
                      placeholder="Apt Number"
                      value={apt.apartment_number}
                      onChange={(e) => {
                        const newApartments = [...apartments];
                        newApartments[index].apartment_number = e.target.value;
                        setApartments(newApartments);
                      }}
                      className="w-1/3 border-gray-300 rounded-md p-1"
                    />
                    <input
                      type="number"
                      placeholder="Floor"
                      value={apt.floor}
                      onChange={(e) => {
                        const newApartments = [...apartments];
                        newApartments[index].floor = parseInt(e.target.value);
                        setApartments(newApartments);
                      }}
                      className="w-1/4 border-gray-300 rounded-md p-1"
                    />
                    <select
                      value={apt.status}
                      onChange={(e) => {
                        const newApartments = [...apartments];
                        newApartments[index].status = e.target.value as "active" | "inactive";
                        setApartments(newApartments);
                      }}
                      className="w-1/3 border-gray-300 rounded-md p-1"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => removeApartment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addApartment} className="mt-2">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Apartment
                </Button>
              </div>
            </div>

            <div className="w-full h-[500px] rounded-md border border-gray-300 overflow-hidden relative">
              <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <Map
                  defaultZoom={12}
                  center={location}
                  mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
                  gestureHandling="greedy"
                  disableDefaultUI
                  onClick={handleMapClick}
                >
                  <AdvancedMarker position={location}>
                    <MapIcon />
                  </AdvancedMarker>
                </Map>
              </APIProvider>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 px-6 flex justify-end gap-3">
            <Button type="submit" disabled={isUpdating}>
              <Pencil className="w-4 h-4 mr-2" />
              {isUpdating ? "Updating..." : "Update Building"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
