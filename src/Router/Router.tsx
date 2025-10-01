import Dashboard from "@/Page/admin-dashboard/Dashboard";
import { Routes, Route } from "react-router";
import Clients from "@/Page/admin-dashboard/Clients";
import Help from "@/Page/admin-dashboard/Help";
import Invoices from "@/Page/admin-dashboard/Invoices";
import Map from "@/Page/admin-dashboard/Map";
import Notifications from "@/Page/admin-dashboard/Notifications";
import Region from "@/Page/admin-dashboard/Region";
import Reports from "@/Page/admin-dashboard/Reports";
import Services from "@/Page/admin-dashboard/Services";
import Settings from "@/Page/admin-dashboard/Settings";
import Subscriptions from "@/Page/admin-dashboard/Subscriptions";
// import Layout from "../Layout";
import Employees from "@/Page/admin-dashboard/Employees";
import AdminLogin from "@/Components/Auth/AdminLogin";
import UserSignUp from "@/Components/Auth/UserSignUp";
import ForgetPassword from "@/Components/Auth/ForgetPassword";
import VerifyCode from "@/Components/Auth/VerifyCode";
import Home from "@/Page/admin-dashboard/Home";
import SetPassword from "@/Components/Auth/SetPassword";
// import SubscriptionPlan from "@/Components/Subscription/SubscriptionPlan";
import Layout from "@/Layout";
import SubscriptionPlan from "@/Components/Subscription/SubscriptionPlan";
import AddNewPlanForm from "@/Page/admin-dashboard/add-new-plan";
import AddNewServiceForm from "@/Page/admin-dashboard/add-services";

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
                <Route path="reports" element={<Reports />} />
                <Route path="services" element={<Services />} />
                <Route path="settings" element={<Settings />} />
                <Route path="subscription" element={<Subscriptions />} />
                <Route path="subscriptionplan" element={<SubscriptionPlan />} />
                <Route path="add-new-plan" element={<AddNewPlanForm />} />
                <Route path="add-services" element={<AddNewServiceForm />} />

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
