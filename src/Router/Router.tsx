import Dashboard from "@/Page/Dashboard";
import { Routes, Route } from "react-router";
import Clients from "@/Page/Clients"
import Help from "@/Page/Help";
import Invoices from "@/Page/Invoices";
import Map from "@/Page/Map";
import Notifications from "@/Page/Notifications";
import Region from "@/Page/Region";
import Reports from "@/Page/Reports";
import Services from "@/Page/Services";
import Settings from "@/Page/Settings";
import Subscriptions from "@/Page/Subscriptions";
import Layout from "../../Layout";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route index element={<Dashboard />} />
      <Route path="client" element={<Clients />} />
      <Route path="help" element={<Help />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="map" element={<Map />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="region" element={<Region />} />
      <Route path="reports" element={<Reports />} />
      <Route path="services" element={<Services />} />
      <Route path="settings" element={<Settings />} />
      <Route path="subscription" element={<Subscriptions />} />
    </Routes>
  )
}

export default Router