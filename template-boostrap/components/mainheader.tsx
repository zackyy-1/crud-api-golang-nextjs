"use client";

import { useRef, useState } from "react";
import {
  Menu, Search, Sun, Moon, ShoppingCart, Bell,
  Grid, Maximize2, Filter, Settings
} from "lucide-react";
import ThemeSwitcher from "@/components/ui/themeSwitcher";
import ShoppingCartDropdown from "@/components/ui/shoppingDropdown";
import NotificationDropdown from "@/components/ui/notificationDropdown";
import { useTheme } from "./context/themeContext";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function MainHeader({ onMenuToggle }: HeaderProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const bellButtonRef = useRef<HTMLButtonElement>(null);
  const { themeMode, setThemeMode } = useTheme();


  const handleFullscreen = () => {
    if (!fullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  return (
    <>
      <header className="sticky top-0 z-40 transition-colors duration-300"
        style={{
        backgroundColor: themeMode === "dark" ? "#2a2a3b" : "#ffffff",
        color: themeMode === "dark" ? "#e5e7eb" : "#111827",
      }}
      >
        <div className="flex items-center justify-between h-14 px-4">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md cursor-pointer hover:text-gray-400"
              suppressHydrationWarning
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-3 py-1.5 text-sm rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                suppressHydrationWarning/>
              <Search className="h-4 w-4 absolute left-2 top-2.5" />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            
            {/* Dark/Light Toggle */}
            {themeMode === "light" ? (
              <Moon
                onClick={() => setThemeMode("dark")}
                className="h-5 w-5 cursor-pointer hover:text-gray-400"
              />
            ) : (
              <Sun
                onClick={() => setThemeMode("light")}
                className="h-5 w-5 cursor-pointer hover:text-gray-400"
              />
            )}

            {/* Shopping Cart Button */}
            <div className="relative">
              <button
                ref={cartButtonRef}
                data-cart-button="true"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-1 rounded-md relative"
                suppressHydrationWarning
              >
                <ShoppingCart className="h-5 w-5 hover:text-gray-400" />
                <span className="absolute -top-1 -right-2 bg-yellow-400 text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  5
                </span>
              </button>

              {/* Shopping Cart Dropdown */}
              <ShoppingCartDropdown
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartButtonRef={cartButtonRef}
              />
            </div>


            <div className="relative">
              <button
                ref={bellButtonRef}
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-1 rounded-md relative"
                suppressHydrationWarning
              >
                <Bell className="h-5 w-5 hover:text-gray-400" />
                <span className="absolute -top-1 -right-2 bg-red-500 text-xs font-bold px-1 rounded-full">
                  6
                </span>
              </button>

              <NotificationDropdown
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
                bellButtonRef={bellButtonRef}
              />
            </div>

            <Grid className="h-5 w-5 cursor-pointer hover:text-gray-400" />

            <button onClick={handleFullscreen} suppressHydrationWarning>
              <Maximize2 className="h-5 w-5 hover:text-gray-400" />
            </button>

            <Filter className="h-5 w-5 cursor-pointer hover:text-gray-400" />

            {/* User Info */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300" />
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium m-0">John</p>
                <p className="text-xs">Web Developer</p>
              </div>
            </div>

            {/* Settings */}
            <button onClick={() => setIsSwitcherOpen(true)} suppressHydrationWarning>
              <Settings className="h-5 w-5 cursor-pointer hover:text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Theme Switcher */}
      <ThemeSwitcher
        isOpen={isSwitcherOpen}
        onClose={() => setIsSwitcherOpen(false)}
      />
    </>
  );
}