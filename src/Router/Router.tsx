import Dashboard from "@/Page/Dashboard";
import { Routes, Route } from "react-router";
import Clients from "@/Page/Clients";
import Help from "@/Page/Help";
import Invoices from "@/Page/Invoices";
import Map from "@/Page/Map";
import Notifications from "@/Page/Notifications";
import Region from "@/Page/Region";
import Reports from "@/Page/Reports";
import Services from "@/Page/Services";
import Settings from "@/Page/Settings";
import Subscriptions from "@/Page/Subscriptions";
// import Layout from "../Layout";
import Employees from "@/Page/Employees";
import AdminLogin from "@/Components/Auth/AdminLogin";
import UserSignUp from "@/Components/Auth/UserSignUp";
import ForgetPassword from "@/Components/Auth/ForgetPassword";
import VerifyCode from "@/Components/Auth/VerifyCode";
import Appertment from "@/Page/Appertment";
import Home from "@/Page/Home";
import SetPassword from "@/Components/Auth/SetPassword";
// import SubscriptionPlan from "@/Components/Subscription/SubscriptionPlan";
import Layout from "@/Layout";
import SubscriptionPlan from "@/Components/Subscription/SubscriptionPlan";

const Router = () => {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="client" element={<Clients />} />
        <Route path="help" element={<Help />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="employees" element={<Employees />} />
        <Route path="map" element={<Map />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="region" element={<Region />} />
        <Route path="appertment" element={<Appertment />} />
        <Route path="reports" element={<Reports />} />
        <Route path="services" element={<Services />} />
        <Route path="settings" element={<Settings />} />
        <Route path="subscription" element={<Subscriptions />} />
        <Route path="subscriptionplan" element={<SubscriptionPlan />} />
        {/* <Route path="reports" element={<Reports />} /> */}
      </Route>
      <Route path="adminlogin" element={<AdminLogin />} />
      <Route path="signup" element={<UserSignUp />} />
      <Route path="forgetpassword" element={<ForgetPassword />} />
      <Route path="verifycode" element={<VerifyCode />} />
      <Route path="setpassword" element={<SetPassword />} />
    </Routes>
  );
};
export default Router;
