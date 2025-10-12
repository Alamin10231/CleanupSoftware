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
import Employees from "@/Page/admin-dashboard/Employees";
import AdminLogin from "@/Components/Auth/AdminLogin";
import UserSignUp from "@/Components/Auth/UserSignUp";
import ForgetPassword from "@/Components/Auth/ForgetPassword";
import VerifyCode from "@/Components/Auth/VerifyCode";
import Home from "@/Page/admin-dashboard/Home";
import SetPassword from "@/Components/Auth/SetPassword";
import Layout from "@/Layout";
import SubscriptionPlan from "@/Components/Subscription/SubscriptionPlan";
import AddNewPlanForm from "@/Page/admin-dashboard/add-new-plan";
import AddNewServiceForm from "@/Page/admin-dashboard/add-services";
import EmployeeDashboard from "@/Page/employee-dashboard/EmployeeDashboard";
import EmployeeCommunication from "@/Page/employee-dashboard/EmployeeCommunication";
import EmployeeSetting from "@/Page/employee-dashboard/EmployeeSetting";
import EmployeeForms from "@/Page/employee-dashboard/EmployeeForms";
import EmployeeReports from "@/Page/employee-dashboard/EmployeeReports";
import EmployeeInvoicees from "@/Page/employee-dashboard/EmployeeInvoicees";
import EmployeeSubscription from "@/Page/employee-dashboard/EmployeeSubscription";
import CreateInvoiceForm from "@/Page/admin-dashboard/create-invoice";
import NotFound from "@/Page/NotFound";
// import Buildingregions from "@/Page/employee-dashboard/building-regions";
// import RegionDashboard from "@/Page/employee-dashboard/building-tasks";
import Verifyotp from "@/Components/Auth/Verifyotp";
import Buildingregions from "@/Page/employee-dashboard/Buildingregions";
import RegionDashboard from "@/Page/employee-dashboard/RegionDashboard";
import ChatPage from "@/Page/employee-dashboard/ChatPage";

const Router = () => {
    return (
        <Routes>
            {/* Public Home */}
            <Route path="home" element={<Home />} />
            <Route path="/" element={<Layout />}>
                {/* admin */}
                <Route index element={<Dashboard />} />
                <Route path="client" element={<Clients />} />
                <Route path="help" element={<Help />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="create-invoice" element={<CreateInvoiceForm />} />
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
                <Route path="chat" element={<ChatPage />} />

                {/* Employee */}
                <Route
                    path="/employee-dashboard"
                    element={<EmployeeDashboard />}
                />
                <Route
                    path="/employee-building"
                    element={<RegionDashboard />}
                />
                <Route
                    path="/employee-communication"
                    element={<EmployeeCommunication />}
                />
                <Route path="/employee-setting" element={<EmployeeSetting />} />
                <Route path="/employee-forms" element={<EmployeeForms />} />
                <Route path="/employee-region" element={<Buildingregions />} />
                <Route path="/employee-report" element={<EmployeeReports />} />
                <Route
                    path="/employee-invoice"
                    element={<EmployeeInvoicees />}
                />
                <Route
                    path="/employee-subscriptions"
                    element={<EmployeeSubscription />}
                />
            </Route>

            {/* Auth routes */}
            <Route path="login" element={<AdminLogin />} />
            <Route path="signup" element={<UserSignUp />} />
            <Route path="verifyotp" element={<Verifyotp />} />
            <Route path="forgetpassword" element={<ForgetPassword />} />
            <Route path="verifycode" element={<VerifyCode />} />
            <Route path="setpassword" element={<SetPassword />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
