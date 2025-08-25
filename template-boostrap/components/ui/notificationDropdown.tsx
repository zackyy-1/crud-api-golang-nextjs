"use client";

import { useEffect, useRef } from "react";

interface NotificationDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    bellButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const notifications = [
  { title: "New Files available", time: "10 hours ago", color: "bg-pink-500", icon: "📁" },
  { title: "Updates available", time: "2 days ago", color: "bg-purple-500", icon: "🛠️" },
  { title: "New order received", time: "1 hour ago", color: "bg-teal-500", icon: "🛒" },
  { title: "New review received", time: "1 day ago", color: "bg-yellow-500", icon: "💬" },
];

export default function NotificationDropdown({ isOpen, onClose, bellButtonRef }: NotificationDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !bellButtonRef.current?.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, bellButtonRef, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full">6 Unread</span>
      </div>
      <ul className="max-h-64 overflow-y-auto divide-y divide-gray-100">
        {notifications.map((notif, idx) => (
          <li key={idx} className="flex items-start gap-3 p-4 hover:bg-gray-50 transition">
            <div className={`h-10 w-10 flex items-center justify-center rounded-full ${notif.color} text-white text-xl`}>
              {notif.icon}
            </div>
            <div>
              <p className="text-sm font-medium">{notif.title}</p>
              <p className="text-xs text-gray-500">{notif.time}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-center border-t">
        <button className="w-full py-2 text-sm text-teal-600 hover:bg-gray-50 transition font-medium">
          View All
        </button>
      </div>
    </div>
  );
}