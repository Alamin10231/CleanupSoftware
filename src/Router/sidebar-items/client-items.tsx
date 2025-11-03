import { lazy } from "react";
const ClientProfile = lazy(() => import("@/Page/client-dashboard/ClientProfile"));
const ClientInvoice = lazy(() => import("@/Page/client-dashboard/ClientInvoice"));
const ClientSubscription = lazy(
  () => import("@/Page/client-dashboard/ClientSubscription")
);
const SendRequest = lazy(() => import("@/Page/client-dashboard/SendRequest"));
const Requests = lazy(() => import("@/Page/client-dashboard/Requests"));
import { CreditCard, User, Send, List, Receipt  } from "lucide-react";

export const clientSidebarItems = [
  {
    title: "Client Dashboard",
    item: [
      {
        title: "Profile",
        url: "/client/profile",
        component: ClientProfile,
        icon: User,
        isActive: false,
      },
      {
        title: "Subscriptions",
        url: "/client/subscription",
        component: ClientSubscription,
        icon: CreditCard,
        isActive: false,
      },
      {
        title: "Send Request",
        url: "/client/send-request",
        component: SendRequest,
        icon: Send,
        isActive: false,
      },
      {
        title: "My Requests",
        url: "/client/Requests",
        component: Requests,
        icon: List,
        isActive: false,
      },

      {
        title: "Invoice",
        url: "/client/invoice",
        component: ClientInvoice,
        icon: Receipt,
        isActive: false,
      },
    ],
  },
];
