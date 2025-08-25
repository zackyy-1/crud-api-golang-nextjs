// app/components/layout/Footer.tsx
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useTheme } from "@/components/context/themeContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { themeMode } = useTheme();
 
  return (
    <footer className="mt-auto transition-colors duration-300"
      style={{
        backgroundColor: themeMode === "dark" ? "#2a2a3b" : "#ffffff",
        color: themeMode === "dark" ? "#e5e7eb" : "#111827",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-0">
            <span className="text-sm">
              Copyright © {currentYear}
            </span>
            <Link
              href="https://spruko.com"
              className="text-blue-600 no-underline hover:text-blue-800 font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nowa
            </Link>
            <span className="text-sm">
              by Spruko
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm hidden sm:block m-0">
              Designed with
            </span>
            <div className="flex items-center">
              <Heart className="h-4 w-4 text-red-500 fill-current mx-1" />
              <span className="text-sm">by</span>
              <Link
                href="https://spruko.com"
                className="text-blue-600 hover:text-blue-800 font-medium ml-1 no-underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Spruko
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 mt-0">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 no-underline hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 no-underline hover:text-gray-700 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/support"
              className="text-sm text-gray-500 no-underline hover:text-gray-700 transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}