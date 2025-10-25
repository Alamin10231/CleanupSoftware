import { lazy } from "react";
const ClientChat = lazy(() => import("@/Page/Client/ClientChat"));
const ClientProfile = lazy(() => import("@/Page/Client/ClientProfile"));
const ClientSubscription = lazy(
  () => import("@/Page/Client/ClientSubscription")
);
import { CreditCard, MessageSquare, User } from "lucide-react";

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
        title: "Chat",
        url: "/client/chat",
        component: ClientChat,
        icon: MessageSquare,
        isActive: false,
      },
    ],
  },
];
