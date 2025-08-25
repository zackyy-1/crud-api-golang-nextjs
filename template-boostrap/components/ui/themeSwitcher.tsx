import { useTheme } from "../context/themeContext";
import { useState } from "react";

interface ThemeSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeSwitcher({ isOpen, onClose }: ThemeSwitcherProps) {
  const {
    direction,
    setDirection,
    themeMode,
    setThemeMode,
    menuColor,
    setMenuColor,
    headerColor,
    setHeaderColor,
    primaryColor,
    setPrimaryColor,
    backgroundColor,
    setBackgroundColor,
  } = useTheme();

  const [activeTab, setActiveTab] = useState<"styles" | "colors">("styles");

  const resetSettings = () => {
    setThemeMode("light");
    setDirection("ltr");
    setMenuColor("#000000");
    setHeaderColor("#000000");
    setPrimaryColor("#3b82f6");
    setBackgroundColor("#ffffff");
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 h-full overflow-y-auto flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Switcher</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab("styles")}
              className={`flex-1 py-2 text-sm font-medium ${
                activeTab === "styles"
                  ? "text-gray-900 border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              Theme Styles
            </button>
            <button
              onClick={() => setActiveTab("colors")}
              className={`flex-1 py-2 text-sm font-medium ${
                activeTab === "colors"
                  ? "text-gray-900 border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              Theme Colors
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "styles" && (
            <div className="space-y-6">
              {/* Theme Mode */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Theme Color Mode:</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setThemeMode("light")}
                    className={`flex-1 py-2 rounded border ${
                      themeMode === "light"
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setThemeMode("dark")}
                    className={`flex-1 py-2 rounded border ${
                      themeMode === "dark"
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>

              {/* Directions */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Directions:</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDirection("ltr")}
                    className={`flex-1 py-2 rounded border ${
                      direction === "ltr"
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    LTR
                  </button>
                  <button
                    onClick={() => setDirection("rtl")}
                    className={`flex-1 py-2 rounded border ${
                      direction === "rtl"
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    RTL
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "colors" && (
            <div className="space-y-6">
              {/* Menu Colors */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Menu Colors:</p>
                <div className="flex gap-2">
                  {["#1f2937", "#0ea5e9", "#06b6d4", "#d1d5db"].map((color) => (
                    <div
                      key={color}
                      className={`w-7 h-7 rounded-full cursor-pointer border-2 ${
                        menuColor === color ? "border-blue-500" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setMenuColor(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Header Colors */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Header Colors:</p>
                <div className="flex gap-2">
                  {["#000000", "#1e293b", "#06b6d4", "#d1d5db"].map((color) => (
                    <div
                      key={color}
                      className={`w-7 h-7 rounded-full cursor-pointer border-2 ${
                        headerColor === color ? "border-blue-500" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setHeaderColor(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Primary Theme */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Theme Primary:</p>
                <div className="flex gap-2">
                  {["#3b82f6", "#8b5cf6", "#22c55e", "#ef4444"].map((color) => (
                    <div
                      key={color}
                      className={`w-7 h-7 rounded-full cursor-pointer border-2 ${
                        primaryColor === color ? "border-blue-500" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setPrimaryColor(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Background Theme */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Theme Background:</p>
                <div className="flex gap-2">
                  {["#1e3a8a", "#312e81", "#166534", "#78350f", "#06b6d4"].map((color) => (
                    <div
                      key={color}
                      className={`w-7 h-7 rounded-full cursor-pointer border-2 ${
                        backgroundColor === color ? "border-blue-500" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setBackgroundColor(color)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reset Button */}
          <div className="mt-auto pt-6">
            <button
              onClick={resetSettings}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}