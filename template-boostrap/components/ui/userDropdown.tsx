"use client";

import { useEffect, useRef } from "react";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "../context/themeContext";

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

export default function UserDropdown({ isOpen, onClose, triggerRef }: UserDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { themeMode, setThemeMode } = useTheme();

  // klik di luar -> tutup
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
        ref={dropdownRef}
        className="absolute top-full right-0 mt-2 w-40
                    rounded shadow-xl z-50 border overflow-hidden transition-colors duration-300"
        style={{
        backgroundColor: themeMode === "dark" ? "#2a2a3b" : "#ffffff",
        color: themeMode === "dark" ? "#e5e7eb" : "#111827",
      }}
    >
      <ul className="p-0 m-0 text-sm">
        <li className="border-b transition-colors duration-300" 
            style={{
                borderColor: themeMode === "dark" ? "#374151" : "#e5e7eb",
            }}
        >
          <button
            onClick={() => {
              router.push("#profile");
              onClose();
            }}
            className={`flex items-center w-full px-4 py-2 transition-colors duration-300
                ${
                    themeMode === "dark" 
                        ? "text-gray-300 hover:bg-[#1e1e2f] hover:text-white" // Dark mode: bg putih, text hitam
                        : "text-gray-700 hover:bg-[#f3f4f6] hover:text-black" // Light mode: bg hitam, text putih
                }`}
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/signin");
              onClose();
            }}
            className={`flex items-center w-full px-4 py-2 transition-colors duration-300
                ${
                    themeMode === "dark" 
                        ? "text-gray-300 hover:bg-[#1e1e2f] hover:text-red-500" // Dark mode: bg putih, text hitam
                        : "text-gray-700 hover:bg-[#f3f4f6] hover:text-red-500" // Light mode: bg hitam, text putih
                }`}
            >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}