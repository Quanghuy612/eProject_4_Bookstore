"use client";
import cn from "classnames";

import Image from "@/components/shared/image";
import { Check } from "lucide-react";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";

interface LayoutOption {
  id: string;
  name: string;
  image: string;
}

const headerLayouts: LayoutOption[] = [
  {
    id: "Basic",
    name: "Basic",
    image: "/assets/demos/panel/header_default.png",
  },
  {
    id: "Header5",
    name: "Header5",
    image: "/assets/demos/panel/header_default.png",
  },
  {
    id: "Header6",
    name: "Header6",
    image: "/assets/demos/panel/header_default.png",
  },
  {
    id: "Header8",
    name: "Header8",
    image: "/assets/demos/panel/header_default.png",
  },
];

const footerLayouts: LayoutOption[] = [
  {
    id: "Basic",
    name: "Basic",
    image: "/assets/demos/panel/footer_default.png",
  },
  {
    id: "Footer5",
    name: "Footer5",
    image: "/assets/demos/panel/footer_default.png",
  },
  {
    id: "Footer7",
    name: "Footer7",
    image: "/assets/demos/panel/footer_default.png",
  },
  {
    id: "Footer8",
    name: "Footer8",
    image: "/assets/demos/panel/footer_default.png",
  },
];

export function LayoutPanel() {
  const {
    selectedLayout,
    setSelectedLayout,
    selectedFooter,
    setSelectedFooter,
  } = usePanel();
  const { selectedColor } = usePanel();

  return (
    <div className="space-y-4">
      {/* Header Layout Selection */}
      <div className="bg-white dark:bg-gray-200/80 rounded-lg p-5 shadow-sm">
        <h3 className="text-base font-medium mb-4">Header Layout</h3>
        <div className="grid grid-cols-2 gap-5 gap-y-10">
          {headerLayouts.map((layout) => (
            <button
              key={layout.id}
              onClick={() => setSelectedLayout(layout.id)}
              className={`group relative flex flex-col items-center rounded border-1 transition-all hover:border-gray-400
                            ${
                              selectedLayout === layout.id
                                ? "border-gray-400 "
                                : "border-gray-300 "
                            }
              `}
            >
              <div className="relative w-full ">
                <Image
                  src={layout.image || "/placeholder.svg"}
                  width={222}
                  height={14}
                  alt={layout.name}
                  className="object-cover"
                />
                {selectedLayout === layout.id && (
                  <div
                    className={cn(
                      colorMap[selectedColor].bg,
                      "absolute top-2 right-2 w-5 h-5  rounded-full flex items-center justify-center animate-in zoom-in duration-200",
                    )}
                  >
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="text-center">
                <h4 className="font-medium text-sm mb-1">{layout.name}</h4>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Layout Selection */}
      <div className="bg-white dark:bg-gray-200/80 rounded-lg p-5 shadow-sm">
        <h3 className="text-base font-medium mb-4">Footer Layout</h3>
        <div className="grid grid-cols-2 gap-5 gap-y-10">
          {footerLayouts.map((layout) => (
            <button
              key={layout.id}
              onClick={() => setSelectedFooter(layout.id)}
              className={`group relative flex flex-col items-center rounded border-1 transition-all hover:border-gray-400
                            ${
                              selectedFooter === layout.id
                                ? "border-gray-400 "
                                : "border-gray-300 "
                            }
              `}
            >
              <div className="relative w-full ">
                <Image
                  src={layout.image || "/placeholder.svg"}
                  width={222}
                  height={45}
                  alt={layout.name}
                  className="object-cover"
                />
                {selectedFooter === layout.id && (
                  <div
                    className={cn(
                      colorMap[selectedColor].bg,
                      "absolute top-2 right-2 w-5 h-5  rounded-full flex items-center justify-center animate-in zoom-in duration-200",
                    )}
                  >
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="text-center">
                <h4 className="font-medium text-sm mb-1">{layout.name}</h4>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
