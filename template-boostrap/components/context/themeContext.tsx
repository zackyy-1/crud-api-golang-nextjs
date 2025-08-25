"use client"
import React, { createContext, useState, useEffect, useContext } from "react";

export type ThemeContextType = {
  themeMode: string;
  setThemeMode: (mode: string) => void;
  direction: "ltr" | "rtl"; 
  setDirection: (dir: "ltr" | "rtl") => void; 
  menuColor: string;
  setMenuColor: (color: string) => void;
  headerColor: string;
  setHeaderColor: (color: string) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState("light");
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  const [menuColor, setMenuColor] = useState("#000000");
  const [headerColor, setHeaderColor] = useState("#000000");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6"); // default Tailwind blue-500
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  useEffect(() => {
  const root = document.documentElement;

    // Theme mode (dark/light)
    if (themeMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Direction (ltr/rtl)
    root.setAttribute("dir", direction);

    // Inject custom colors
    root.style.setProperty("--menu-color", menuColor);
    root.style.setProperty("--header-color", headerColor);
    root.style.setProperty("--primary-color", primaryColor);
    root.style.setProperty("--background-color", backgroundColor);
  }, [themeMode, direction, menuColor, headerColor, primaryColor, backgroundColor]);


  useEffect(() => {
    // Inject into :root as CSS vars
    const root = document.documentElement;
    root.style.setProperty("--menu-color", menuColor);
    root.style.setProperty("--header-color", headerColor);
    root.style.setProperty("--primary-color", primaryColor);
    root.style.setProperty("--background-color", backgroundColor);
  }, [menuColor, headerColor, primaryColor, backgroundColor]);

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        setThemeMode,
        direction,
        setDirection,
        menuColor,
        setMenuColor,
        headerColor,
        setHeaderColor,
        primaryColor,
        setPrimaryColor,
        backgroundColor,
        setBackgroundColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}