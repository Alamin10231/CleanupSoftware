import Regioncomponent from "@/Components/Region/Regioncomponent";
import { Outlet } from "react-router-dom";

const Region = () => {
  return (
    <div>
      {/* Region main content */}
      <Regioncomponent />

      {/* Nested routes will be rendered here */}
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Region;
