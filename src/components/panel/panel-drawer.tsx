"use client";

import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import { TabNavigation } from "@/components/panel/tab-navigation";
import { ColorPanel } from "@/components/panel/color-panel";
import { LayoutPanel } from "@/components/panel/layout-panel";
import { ThemePanel } from "@/components/panel/theme-panel";
import type { TabType } from "@/services/types";
import { usePanel } from "@/contexts/usePanel";

export default function PanelCustomizer() {
  const tabs: TabType[] = ["COLOR", "LAYOUT", "THEME"];
  const { selectedTab, setSelectedTab } = usePanel();
  return (
    <div className="bg-gray-100 min-h-screen">
      <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
        <TabNavigation tabs={tabs} />

        <TabPanels className="p-4 max-w-md mx-auto">
          <TabPanel>
            <ColorPanel />
          </TabPanel>
          <TabPanel>
            <LayoutPanel />
          </TabPanel>
          <TabPanel>
            <ThemePanel />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
