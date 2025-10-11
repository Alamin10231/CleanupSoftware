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
import EmployeeBuilding from "@/Page/employee-dashboard/EmployeeBuilding";
import EmployeeCommunication from "@/Page/employee-dashboard/EmployeeCommunication";
import EmployeeSetting from "@/Page/employee-dashboard/EmployeeSetting";
import EmployeeForms from "@/Page/employee-dashboard/EmployeeForms";
import EmployeeHelp from "@/Page/employee-dashboard/EmployeeHelp";
import EmployeeRegion from "@/Page/employee-dashboard/EmployeeRegion";
import EmployeeReports from "@/Page/employee-dashboard/EmployeeReports";
import EmployeeInvoicees from "@/Page/employee-dashboard/EmployeeInvoicees";
import EmployeeSubscription from "@/Page/employee-dashboard/EmployeeSubscription";
import CreateInvoiceForm from "@/Page/admin-dashboard/create-invoice";
import NotFound from "@/Page/NotFound";
// import Buildingregions from "@/Page/employee-dashboard/building-regions";
// import RegionDashboard from "@/Page/employee-dashboard/building-tasks";
import Verifyotp from "@/Components/Auth/Verifyotp";
import AddReportForm from "@/Page/supervisor-dashboard/AddReport";

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

                {/* Employee & Supervisor */}
                <Route
                    path="/dashboard"
                    element={<EmployeeDashboard />}
                />
                <Route
                    path="/building"
                    element={<EmployeeBuilding />}
                />
                <Route
                    path="/communication"
                    element={<EmployeeCommunication />}
                />
                <Route path="/setting" element={<EmployeeSetting />} />
                <Route path="/forms" element={<EmployeeForms />} />
                <Route path="/help" element={<EmployeeHelp />} />
                <Route path="/region" element={<EmployeeRegion />} />
                <Route path="/report" element={<EmployeeReports />} />
                <Route
                    path="/invoice"
                    element={<EmployeeInvoicees />}
                />
                <Route
                    path="/subscriptions"
                    element={<EmployeeSubscription />}
                />
                <Route path="/add-report" element={<AddReportForm />} />
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
