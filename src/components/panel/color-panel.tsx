"use client";

import { useState } from "react";
import type { ThemeMode } from "@/services/types";
import { sortedColorMapArray, SortedColorMapItem } from "@/data/color-settings";
import { usePanel } from "@/contexts/usePanel";
import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import { Tooltip } from "@/components/shared/tooltip";
import cn from "classnames";

export function ColorPanel() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const { theme, setTheme } = useTheme();
  const { selectedColor, setSelectedColor } = usePanel();

  // Create a unique identifier by combining key, id, and industry
  const getUniqueColorId = (colorObj: SortedColorMapItem): string => {
    return `${colorObj.key}-${colorObj.id}-${colorObj.industry}`;
  };

  // Find the initial selected color and set its unique ID
  const initialColor = sortedColorMapArray.find((c) => c.key === selectedColor);
  const initialUniqueId = initialColor
    ? getUniqueColorId(initialColor)
    : sortedColorMapArray.length > 0
      ? getUniqueColorId(sortedColorMapArray[0])
      : "";

  const [activeColorId, setActiveColorId] = useState<string>(initialUniqueId);

  // Handle click to set both selected color and unique activeColorId
  function handleClickActive(color: string, colorObj: SortedColorMapItem) {
    setSelectedColor(color);
    setActiveColorId(getUniqueColorId(colorObj));
  }

  // Toggle the theme and persist it
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setThemeMode(theme === "dark" ? "light" : "dark");
  };

  // Group colors by industry, ensuring no duplicates within an industry
  const groupedByIndustry = sortedColorMapArray.reduce(
    (acc, colorObj) => {
      const industryKey = colorObj.industry || "No Industry";
      if (!acc[industryKey]) {
        acc[industryKey] = [];
      }
      if (
        !acc[industryKey].some(
          (c) => getUniqueColorId(c) === getUniqueColorId(colorObj),
        )
      ) {
        acc[industryKey].push(colorObj);
      }
      return acc;
    },
    {} as Record<string, SortedColorMapItem[]>,
  );

  return (
    <div className="space-y-4">
      {/* Theme Illustration */}
      <div className="bg-white dark:bg-gray-200/80 rounded-lg p-5 shadow-sm">
        <h3 className="text-base font-medium mb-4">Theme Mode</h3>
        <div className="flex items-center">
          <span
            className={`mr-2 ${themeMode === "light" ? "" : "text-gray-500"}`}
          >
            Light
          </span>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              themeMode === "dark" ? "bg-green-200" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                themeMode === "dark" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`ml-2 ${themeMode === "dark" ? "" : "text-gray-500"}`}
          >
            Dark
          </span>
        </div>
      </div>

      {/* Color Combinations */}
      <div className="bg-white dark:bg-gray-200/80 rounded-lg p-5 shadow-sm">
        <div className="space-y-6">
          {Object.entries(groupedByIndustry)
            .sort(([industryA], [industryB]) =>
              industryA.localeCompare(industryB),
            ) // Sort industries alphabetically
            .map(([industry, colors]) => (
              <div key={industry}>
                <h4 className="text-15px font-medium capitalize mb-2">
                  {industry}
                </h4>
                <div className="grid grid-cols-5 gap-4">
                  {colors.map((colorObj) => {
                    const uniqueColorId = getUniqueColorId(colorObj);
                    return (
                      <div
                        key={uniqueColorId}
                        className="text-center space-y-1"
                      >
                        <Tooltip content={`${colorObj.name} `}>
                          <button
                            className={cn(
                              `relative h-15 w-15 rounded-xl transition duration-300 ${colorObj.bg} hover:opacity-100 transition-all`,
                              {
                                "opacity-90 inset-shadow-sm ":
                                  activeColorId != uniqueColorId,
                              },
                              {
                                "drop-shadow-md]":
                                  activeColorId === uniqueColorId,
                              },
                            )}
                            onClick={() =>
                              handleClickActive(colorObj.key, colorObj)
                            }
                          >
                            {activeColorId === uniqueColorId && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Check className="w-6 h-6 text-brand-light animate-in zoom-in duration-200" />
                              </div>
                            )}
                          </button>
                        </Tooltip>
                        <p className=" hidden text-xs font-medium capitalize">
                          {colorObj.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
