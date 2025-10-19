import {
    APIProvider,
    Map,
    AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import CustomMarker from "./CustomMarker";

export default function WholeMap({ selectedApartment }) {
    const [position, setPosition] = useState();
    const riyadh = { lat: 24.7136, lng: 46.6753 };

   //  useEffect(() => {
   //      if (selectedApartment) {
   //          setPosition(selectedApartment.location);
   //      }
   //  }, [selectedApartment]);

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <div className="h-full">
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
                    {/* <Regions /> */}
                        <AdvancedMarker
                            position={position}
                        >
                            <CustomMarker />
                        </AdvancedMarker>
                </Map>
            </div>
        </APIProvider>
    );
}
