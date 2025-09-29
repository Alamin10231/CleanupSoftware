import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Outlet } from "react-router";

const Layout = () => {
    return (
        <div className="flex nunito">
            <div className="shadow-[0_0_10px_#00000040] h-screen fixed top-0 left-0 z-50">
                <Sidebar />
            </div>
            <main className="flex-1 rounded-lg px-8 ml-[250px]">
                <Navbar />
                <div className="mt-24 mb-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
