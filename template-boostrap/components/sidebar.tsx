"use client";

import Link from "next/link";
import { useTheme } from "./context/themeContext";
import { useState } from "react";
import { 
  ChevronDown, 
  ChevronRight, 
  LayoutDashboard, 
  AppWindow,
  Settings,
  FileText,
  HelpCircle,
  Layers,
  BarChart3,
  ShoppingCart,
  type Icon as LucideIcon
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

interface MenuItem {
  title: string;
  icon?: typeof LucideIcon;
  path?: string;
  children?: MenuItem[];
  badge?: string;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboards",
    icon: LayoutDashboard,
    children: [
      { title: "Perpustakaan", path: "/dashboard1" },
      { title: "Data Table", path: "/dashboard2" }
    ]
  },
  {
    title: "Action",
    icon: AppWindow,
    children: [
      { title: "Add Data", path: "/add" }
    ]
  }
];

export default function Sidebar({ isOpen }: SidebarProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { themeMode } = useTheme();

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <aside className="h-screen flex flex-col fixed top-0 left-0 z-40 shadow transition-all duration-300"
        style={{
          backgroundColor: themeMode === "dark" ? "#2a2a3b" : "#ffffff",
          color: themeMode === "dark" ? "#e5e7eb" : "#111827",
          width: isOpen ? "16rem" : "0",
          overflow: "hidden"
        }}
    >
      {isOpen && (
        <>  
          {/* Header */}
          <div className="p-6 border-b" style={{ borderColor: themeMode === "dark" ? "#374151" : "#e5e7eb" }}>
            <Link href="/" className="flex no-underline items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: themeMode === "dark" ? "#e5e7eb" : "#111827" }}>
                  Nowa
                </h1>
                <p className="text-xs" style={{ color: themeMode === "dark" ? "#9ca3af" : "#6b7280" }}>
                  Dashboard
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const IconComponent = item.icon || LayoutDashboard;
                return (
                  <div key={item.title} className="relative">
                    <button
                      onClick={() => toggleMenu(item.title)}
                      onMouseEnter={() => setHoveredItem(item.title)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                        openMenus[item.title] 
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : hoveredItem === item.title 
                          ? (themeMode === "dark" ? 'bg-[#1e1e2f]' : 'bg-gray-200') + ' ' +
                            (themeMode === "dark" ? 'text-white' : 'text-gray-900')
                          : (themeMode === "dark" ? 'text-gray-300 hover:bg-[#1e1e2f]' : 'text-gray-700 hover:bg-gray-200') +
                            ' hover:text-white'
                      }`}
                      suppressHydrationWarning
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium" suppressHydrationWarning>{item.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.badge && (
                          <span className="px-2 py-1 bg-blue-500 text-xs text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                        {item.children && (
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-200 ${
                              openMenus[item.title] ? 'rotate-180' : ''
                            }`} 
                          />
                        )}
                      </div> 
                    </button>

                    {/* Submenu */}
                    {item.children && openMenus[item.title] && ( 
                      <div 
                        className="ml-4 mt-1 pl-3 space-y-1"
                        style={{ borderColor: themeMode === "dark" ? "#4B5563" : "#D1D5DB" }}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.path || "#"}
                            className={`flex no-underline items-center space-x-2 p-2 text-sm rounded-lg transition-colors duration-150 ${
                              themeMode === "dark" 
                                ? "text-gray-300 hover:bg-[#1e1e2f] hover:text-black" // Dark mode: bg putih, text hitam
                                : "text-gray-700 hover:bg-[#D1D5DB] hover:text-white" // Light mode: bg hitam, text putih
                            }`}
                          >
                            <ChevronRight className="w-3 h-3" />
                            <span>{child.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div 
              className="my-4 border-t" 
              style={{ borderColor: themeMode === "dark" ? "#374151" : "#e5e7eb" }}
            ></div>

            {/* Additional Links */}
            <div className="space-y-1">
              <Link
                href="/help"
                className={`flex no-underline items-center space-x-3 p-3 rounded-lg transition-colors duration-150 ${
                  themeMode === "dark" 
                    ? "text-gray-300 hover:bg-[#3f3f5a] hover:text-white"
                    : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Help Center</span>
              </Link>
              <Link
                href="/settings"
                className={`flex no-underline items-center space-x-3 p-3 rounded-lg transition-colors duration-150 ${
                  themeMode === "dark" 
                    ? "text-gray-300 hover:bg-[#3f3f5a] hover:text-white"
                    : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                <Settings className="w-5 h-5" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
            </div>
          </nav>
        </>
      )}
    </aside>
  );
}