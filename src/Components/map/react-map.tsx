import {
    APIProvider,
    Map,
    AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import CustomMarker from "./CustomMarker";

export default function Intro({ selectedApartment }) {
    const [position, setPosition] = useState({ lat: 24.89, lng: 91.88 });

    useEffect(() => {
        if (selectedApartment) {
            setPosition(selectedApartment.location);
        }
    }, [selectedApartment]);

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <div className="h-full">
                <Map
                    defaultZoom={12}
                    center={position}
                    mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
                    gestureHandling={'greedy'}
                    disableDefaultUI
                >
                    {selectedApartment && (
                        <AdvancedMarker
                            position={position}
                        >
                            <CustomMarker />
                        </AdvancedMarker>
                    )}
                </Map>
            </div>
        </APIProvider>
    );
}
