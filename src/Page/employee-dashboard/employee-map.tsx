import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import CustomMarker from "@/Components/map/CustomMarker";

interface Building {
  id: number;
  name: string;
  type: string;
  city: string;
  location: string;
  building_latitude: string;
  building_longitude: string;
  created_at: string;
  region: number;
  region_name: string;
  total_apartments: number;
  active_apartments_in_building: number;
}

export default function EmployeeMap({ building }: { building?: Building }) {
  const defaultCenter = { lat: 24.7136, lng: 46.6753 }; // fallback Riyadh

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="h-[400px] w-full relative">
        <Map
          defaultZoom={12}
          defaultCenter={
            building
              ? {
                  lat: parseFloat(building.building_latitude),
                  lng: parseFloat(building.building_longitude),
                }
              : defaultCenter
          }
          mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
          gestureHandling="greedy"
          disableDefaultUI
        >
          {building && <RegionBuildingMarkers building={building} />}
        </Map>
      </div>
    </APIProvider>
  );
}

function RegionBuildingMarkers({ building }: { building: Building }) {
  const position = {
    lat: parseFloat(building.building_latitude),
    lng: parseFloat(building.building_longitude),
  };

  return (
    <AdvancedMarker key={building.id} position={position} title={building.name}>
      <CustomMarker building={building} />
    </AdvancedMarker>
  );
}
