import Navbar from "./src/Components/Navbar";
import Sidebar from "./src/Components/Sidebar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex nunito">
      <div className="shadow-[0_0_10px_#00000040]">
        <Sidebar />
      </div>
      <main className="flex-1 rounded-lg px-12">
        <Navbar />
        <Outlet  />
      </main>
    </div>
  );
};

export default Layout;
