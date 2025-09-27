import Navbar from "./src/Components/Navbar"
import Sidebar from "./src/Components/Sidebar"
import { Outlet, useLocation } from 'react-router'

const Layout = () => {
  const location = useLocation()
  const hidenav = location.pathname === "adminlogin"
  return (
    <div className="flex">
     {
      !hidenav && (
         <div className="shadow-[0_0_10px_#00000040] bg-white">
        <Sidebar />
      </div>

      )
     }
      <main className="flex-1">
      {!hidenav &&   <Navbar />}
        <Outlet />
      </main>
    </div>
  )
}

export default Layout