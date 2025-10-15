import React from "react";
import { SidebarMenuItem } from "./sidebarMenuItem.tsx";
import type { MenuSection } from "@/Types/Types.ts";

interface SidebarSectionProps {
  section: MenuSection;
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({ section }) => {
  return (
    <div className="mb-6">
      {section.heading && (
        <h2 className="px-6 mb-2 text-xs font-bold text-gray-900 uppercase tracking-wide">
          {section.heading}
        </h2>
      )}
      <ul className="space-y-2">
        {section.items.map((item, index) => (
          <SidebarMenuItem key={`${item.path}-${index}`} item={item} />
        ))}
      </ul>
    </div>
  );
};
