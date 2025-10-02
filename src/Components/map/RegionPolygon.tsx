import { Polygon } from "@react-google-maps/api";

const paths = [
    { lat: 24.89, lng: 91.87 },
    { lat: 24.9, lng: 91.88 },
    { lat: 24.89, lng: 91.89 },
    { lat: 24.88, lng: 91.88 },
];

const RegionPolygon = () => (
    <Polygon
        paths={paths}
        options={{
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#0000FF",
            fillOpacity: 0.35,
        }}
    />
);

export default RegionPolygon;
