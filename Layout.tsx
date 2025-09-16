import React from 'react'
import Navbar from "./src/Components/Navbar"
import Sidebar from "./src/Components/Sidebar"
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className="flex">
      <div className="shadow-[0_0_10px_#00000040] bg-white">
        <Sidebar />
      </div>

      <main className="flex-1">
        <Navbar />
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
