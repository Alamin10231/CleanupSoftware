import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";
import { Link } from "react-router-dom";
import { getSidebarItems } from "@/Router/routes.config";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Logo from "./Logo";
import { useLocation } from "react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation(); // Get current location
  const data = {
    navMain: getSidebarItems(user?.user_type),
  };

  // Function to check if a sidebar item is active
  const isMenuItemActive = (itemUrl: string) => {
    // Handle dynamic routes
    const currentPathSegments = location.pathname.split('/').filter(Boolean);
    const itemUrlSegments = itemUrl.split('/').filter(Boolean);

    if (currentPathSegments.length !== itemUrlSegments.length) {
      return false;
    }

    let match = true;
    for (let i = 0; i < itemUrlSegments.length; i++) {
      if (itemUrlSegments[i].startsWith(':')) {
        // Dynamic segment, always matches
        continue;
      }
      if (itemUrlSegments[i] !== currentPathSegments[i]) {
        match = false;
        break;
      }
    }
    return match;
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {(data.navMain ?? []).map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-xl">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.item.map((subItem) => ( // Renamed item to subItem to avoid conflict
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton asChild isActive={isMenuItemActive(subItem.url)}>
                      <Link
                        to={subItem.url}
                        className="flex items-center gap-2 text-lg text-gray-600"
                      >
                        {subItem.icon && <subItem.icon className="size-4" />}
                        {subItem.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
