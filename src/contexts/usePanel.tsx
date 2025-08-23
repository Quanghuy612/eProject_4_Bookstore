"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface ColorContextType {
  selectedColor: string;
  selectedTab: number;
  selectedLayout: string | undefined;
  selectedFooter: string | undefined;

  setSelectedColor: (color: string) => void;
  setSelectedTab: (index: number) => void;
  setSelectedLayout: (layout: string) => void;
  setSelectedFooter: (layout: string) => void;
}

// Create the context
const UsePanel = createContext<ColorContextType | undefined>(undefined);

// Provider Component
export const ColorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>("primary");
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedLayout, setSelectedLayout] = useState<string>();
  const [selectedFooter, setSelectedFooter] = useState<string>();
  return (
    <UsePanel.Provider
      value={{
        selectedColor,
        setSelectedColor,
        selectedTab,
        setSelectedTab,
        selectedLayout,
        setSelectedLayout,
        selectedFooter,
        setSelectedFooter,
      }}
    >
      {children}
    </UsePanel.Provider>
  );
};

// Custom hook to use the context
export const usePanel = (): ColorContextType => {
  const context = useContext(UsePanel);
  if (!context) {
    throw new Error("usePanel must be used within a PanelProvider");
  }
  return context;
};
