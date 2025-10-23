import { useGetBuildingByIdQuery } from "@/redux/features/admin/buildings/building.api";
import MultipleSelector from "./multiselect";
import { Label } from "@/Components/ui/label";
import { useState } from "react";

export default function Multiselect() {
  const { data } = useGetBuildingByIdQuery(1);
  const [selectedApartments, setSelectedApartments] = useState([]);
  const apartments = data?.apartments.map((apt: any) => ({
    value: apt.id,
    label: apt.apartment_number,
  }));
  console.log(apartments);

  const handleSelectionChange = (selected: any[]) => {
    setSelectedApartments(selected);
    console.log("Selected apartments:", selected);
  };
  return (
    <div className="*:not-first:mt-2">
      <Label>Multiselect</Label>
      <MultipleSelector
        commandProps={{
          label: "Select frameworks",
        }}

        options={apartments}
        placeholder="Select apartments"
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
        onChange={handleSelectionChange}
      />
    </div>
  );
}
