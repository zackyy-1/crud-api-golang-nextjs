// components/LoginWarning.tsx
"use client";

import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import router from "next/dist/shared/lib/router/router";
import { useRouter } from "next/navigation";

interface LoginWarningProps {
  isOpen: boolean;
//   onClose: () => void;
  onLogin: () => void;
}

export default function LoginWarning({ isOpen, onLogin }: LoginWarningProps) {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      
      {/* Notification Modal */}
      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}>
        <div className="bg-white rounded-lg shadow-xl w-96 max-w-[90vw] overflow-hidden">
          {/* Header */}
          <div className="bg-yellow-500 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-7 w-7 text-white" />
              <h4 className="text-white mt-2 font-semibold">WARNING NOTIFICATION</h4>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-8 w-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Akses Ditolak</h4>
                <p className="text-gray-600 text-sm">
                  Anda harus login terlebih dahulu untuk mengakses dashboard. 
                  Silakan login dengan akun Anda untuk melanjutkan.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => router.push("/signin")}
                className="flex-1 rounded px-4 py-2 bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
              >
                Login Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}