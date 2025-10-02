import React, { useState } from "react";
import {
    GoogleMap,
    Marker,
    InfoWindow,
    useJsApiLoader,
} from "@react-google-maps/api";
import RegionPolygon from "./RegionPolygon";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = { lat: 24.89, lng: 91.88 };

export default function Intro() {
    const [open, setOpen] = useState(false);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        mapIds: [import.meta.env.VITE_GOOGLE_MAPS_ID],
    });

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="h-full" style={{ height: "100%" }}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                options={{
                    gestureHandling: "greedy",
                    disableDefaultUI: true,
                    mapId: import.meta.env.VITE_GOOGLE_MAPS_ID,
                }}
                onClick={() => setOpen(!open)}
            >
                <Marker position={center} />
                {open && (
                    <InfoWindow
                        position={center}
                        onCloseClick={() => setOpen(false)}
                    >
                        <p>you are here</p>
                    </InfoWindow>
                )}
                <RegionPolygon />
            </GoogleMap>
        </div>
    );
}
