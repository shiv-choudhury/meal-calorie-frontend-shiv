"use client";

import { useEffect } from "react";
import useThemeStore from "@/store/themeStore";

export default function ThemeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const mode = useThemeStore((s) => s.mode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return <>{children}</>;
}
