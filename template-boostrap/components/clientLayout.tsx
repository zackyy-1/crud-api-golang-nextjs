"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import MainHeader from "@/components/mainheader";
import Footer from "@/components/footer";
import { useTheme } from "@/components/context/themeContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const { direction, themeMode } = useTheme();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("dir", direction);
    }
  }, [direction]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >
        {/* Header */}
        <MainHeader onMenuToggle={toggleSidebar} />

        {/* Content */}
        <main className="flex-1 p-0 bg-gray-50">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
