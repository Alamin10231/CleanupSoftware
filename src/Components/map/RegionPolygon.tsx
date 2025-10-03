import { Polyline, Polygon } from "@react-google-maps/api";

const lineSymbol = {
  path: "M 0,-1 0,1",
  strokeOpacity: 1,
  scale: 2,
};

const RegionPolygon = ({ paths }) => {
   console.log(paths)
  return <>
    <Polygon
      paths={paths}
      options={{
        strokeColor: "#5E81F4",
        strokeOpacity: 0.6,
        strokeWeight: 2,
        fillColor: "#5E81F4",
        fillOpacity: 0.18,
      }}
    />
    <Polyline
      path={paths}  // ✅ correct
      options={{
        strokeColor: "#5E81F4",
        strokeOpacity: 1,
        strokeWeight: 2,
        icons: [
          {
            icon: lineSymbol,
            offset: "0",
            repeat: "10px",
          },
        ],
      }}
    />
  </>
}

export default RegionPolygon;
