import Navbar from "./src/Components/Navbar";
import Sidebar from "./src/Components/Sidebar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex nunito">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen shadow-[0_0_10px_#00000040] bg-white">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 ml-[250px] px-12">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
