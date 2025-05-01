"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "sonner";
export default function LayoutTheme({ children, defaultTheme = "system" }) {
  useEffect(() => {
    // Apply saved color-theme immediately when app loads
    const colorTheme = localStorage.getItem("color-theme") || "default";
    document.documentElement.setAttribute("data-theme", colorTheme);
  }, []);

  return (
    <Provider store={store}>
        <ThemeProvider attribute="class" defaultTheme={defaultTheme} enableSystem>
            {children}
            {/* <Toaster richColors position="top-right" /> */}
        </ThemeProvider>
    </Provider>
  );
}
