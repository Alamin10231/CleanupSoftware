import { useEffect, useState } from "react";
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

export default function Intro({ paths, search }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [open, setOpen] = useState(false);
  const [center, setCenter] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    mapIds: [import.meta.env.VITE_GOOGLE_MAPS_ID],
  });

  // Fetch coordinates whenever `search` changes
  useEffect(() => {
    async function fetchAreaCoordinates() {
      if (!search) return;

      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        search
      )}&key=${apiKey}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.status !== "OK" || !data.results.length) {
          throw new Error("No results found");
        }

        const location = data.results[0].geometry.location;
        setCenter(location);
        console.log("Place:", data.results[0].formatted_address);
      } catch (err) {
        console.error("Error fetching coordinates:", err);
      }
    }

    fetchAreaCoordinates();
  }, [search, apiKey]);

  if (!isLoaded || !center) return <div>Loading...</div>;
  console.log(center)

  return (
    <div className="h-full">
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
        {open && <InfoWindow position={center}><p>You are here</p></InfoWindow>}
        {paths?.length > 0 && <RegionPolygon paths={paths} />}
      </GoogleMap>
    </div>
  );
}
