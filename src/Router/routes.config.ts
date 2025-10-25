import type { ISidebarItems, UserRole } from "@/Types/Types";
import { adminSidebarItems } from "./sidebar-items/admin-items";
import { employeeSidebarItems } from "./sidebar-items/employee-items";
import { clientSidebarItems } from "./sidebar-items/client-items";
import { supervisorSidebarItems } from "./sidebar-items/supervisor-items";

export const generateRoutes = (sidebarItems: ISidebarItems[]) => {
  return sidebarItems.flatMap((section) =>
    section.item.map((route) => ({
      path: route.url,
      Component: route.component,
    }))
  );
};

export const getSidebarItems = (role: UserRole) => {
   switch (role) {
      case 'admin':
         return [...adminSidebarItems];

      case 'employee':
         return employeeSidebarItems;

      case 'supervisor':
         return [...employeeSidebarItems, ...supervisorSidebarItems]

      case 'client':
         return clientSidebarItems;

      // case 'guest':
      //    return guestSidebarItems;

      default:
         break;
   }
}
