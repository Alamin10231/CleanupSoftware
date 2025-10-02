import YouAreHere from "@/Components/map/here";
import { middleOfUSA } from "@/lib/constants";
import { Map, Marker } from "@vis.gl/react-maplibre";
import { useEffect, useState } from "react";

export default function App() {
    const [marker, setMarker] = useState<{ lat: number; lng: number }[]>([]);

    useEffect(() => {
        console.log(marker);
    }, [marker]);

    return (
            <Map
                onClick={(e) => {
                    setMarker((prev) => [
                        ...prev,
                        { lat: e.lngLat.lat, lng: e.lngLat.lng },
                    ]);
                }}
                initialViewState={{
                    longitude: middleOfUSA[0],
                    latitude: middleOfUSA[1],
                    zoom: 2,
                }}
                mapStyle="https://tiles.openfreemap.org/styles/liberty"
                attributionControl={false}
            >
                {marker.map((mark, i) => (
                    <Marker
                        key={i}
                        longitude={mark.lng}
                        latitude={mark.lat}
                        anchor="bottom"
                    ></Marker>
                ))}
                <YouAreHere />
            </Map>
    );
}
