const regions = [
  { lat: 24.90, lng: 91.89 },
  { lat: 24.91, lng: 91.90 },
  { lat: 24.89, lng: 91.91 },
];

export default function Regions() {
  return (
    <>
      {regions.map((region, index) => (
        <Circle
          key={index}
          center={region}
          radius={500}
          strokeColor="#00FF00"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#00FF00"
          fillOpacity={0.35}
        />
      ))}
    </>
  );
}
