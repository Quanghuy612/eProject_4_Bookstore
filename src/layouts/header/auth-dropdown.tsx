"use client";

import React, { useRef, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { User, ShoppingBag, Heart, HelpCircle, LogOut } from "lucide-react";
import AccountIcon from "@/components/icons/account-icon";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";

interface UserDropdownProps {
  useLabel?: boolean;
  userName?: string;
  userLocation?: string;
  userImage?: string;
}

export default function AuthDropdown({
  useLabel = true,
  userName = "Luhan Nguyen",
  userLocation = "Los Angeles, CA",
  userImage = "/assets/images/support/3.png",
}: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { selectedColor } = usePanel();

  const handleNavigation = (route: string) => {
    // Close the popover
    setIsOpen(false);
    buttonRef.current?.click();
    // Navigate to the route
    router.push(route);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    // Close the popover
    setIsOpen(false);
    buttonRef.current?.click();
  };

  return (
    <Popover className="relative">
      <PopoverButton
        ref={buttonRef}
        className={`hidden lg:flex items-center  focus:outline-none `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="cart-button ">
          <AccountIcon />
        </div>
        {useLabel && (
          <span className="text-sm font-normal ms-2"> My Account</span>
        )}
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute right-0 z-10 mt-4 w-70 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5  transition duration-200 ease-in-out"
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      >
        <div className="pt-4">
          {/* User Profile */}
          <div className="flex items-center gap-3 px-4 pb-4 border-b border-gray-100 ">
            <img
              src={userImage}
              alt={userName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-brand-dark">{userName}</h3>
              <p className="text-sm text-gray-500">{userLocation}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <MenuItem
              icon={<User className="w-5 h-5" />}
              label="My Account"
              onClick={() => handleNavigation(ROUTES.ACCOUNT)}
            />
            <MenuItem
              icon={<ShoppingBag className="w-5 h-5" />}
              label="My Order"
              onClick={() => handleNavigation(ROUTES.ORDERS)}
            />
            <MenuItem
              icon={<Heart className="w-5 h-5" />}
              label="Wishlist"
              onClick={() => handleNavigation(ROUTES.SAVELISTS)}
            />
          </div>

          <div className="border-t border-gray-100 py-2">
            <MenuItem icon={<HelpCircle className="w-5 h-5" />} label="Help" />
            <MenuItem
              icon={<LogOut className="w-5 h-5" />}
              label="Log out"
              onClick={handleLogout}
            />
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  const { selectedColor } = usePanel();
  return (
    <button
      className={`flex items-center w-full px-4 py-3 text-sm text-body hover:bg-gray-50 ${colorMap[selectedColor].hoverLink}`}
      onClick={onClick}
    >
      <span className="mr-3 ">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
