import {
    APIProvider,
    Map,
    AdvancedMarker,
} from "@vis.gl/react-google-maps";
import CustomMarker from "./CustomMarker";
import { useGetregionsQuery } from "@/redux/features/admin/regions/regions.api";
import { useGetBuildingsByRegionQuery } from "@/redux/features/admin/buildings/building.api";

interface Building {
  id: number;
  name: string;
  type: string;
  city: string;
  location: string;
  latitude: string;
  longitude: string;
  created_at: string;
  region: number;
  region_name: string;
  total_apartments: number;
  active_apartments_in_building: number;
}

export default function WholeMap() {
    const riyadh = { lat: 24.7136, lng: 46.6753 };

    // Fetch all regions
    const { data: regionsData } = useGetregionsQuery(undefined);
    const regions = regionsData?.results || [];

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <div className="h-full" style={{ position: "relative" }}>
                <Map
                    defaultZoom={12}
                    defaultCenter={riyadh}
                    mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
                    gestureHandling={'greedy'}
                    disableDefaultUI
                    onClick={(e) => {
                        console.log(e.detail.latLng);
                    }}
                >
                    {/* Render markers for each region's buildings */}
                    {regions.map((region: { id: number; name: string }) => (
                        <RegionBuildingMarkers key={region.id} regionId={region.id} />
                    ))}
                </Map>
            </div>
        </APIProvider>
    );
}

// Component to fetch and render buildings for a specific region
interface RegionBuildingMarkersProps {
    regionId: number;
}

function RegionBuildingMarkers({ regionId }: RegionBuildingMarkersProps) {
    const { data: buildings = [] } = useGetBuildingsByRegionQuery(regionId);

    return (
        <>
            {buildings.map((building: Building) => {
                const position = {
                    lat: parseFloat(building.latitude),
                    lng: parseFloat(building.longitude),
                };

                return (
                    <AdvancedMarker
                        key={building.id}
                        position={position}
                        title={building.name}
                    >
                        <CustomMarker building={building} />
                    </AdvancedMarker>
                );
            })}
        </>
    );
}
