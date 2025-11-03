"use client";
import { useEffect } from "react";
import useThemeStore from "@/store/themeStore";

export default function ThemeApplier() {
  const mode = useThemeStore((s) => s.mode);
  console.log("mode", mode);
  // useEffect(() => {
  //   const root = document.documentElement;
  //   const body = document.body;
  //   if (mode === "dark") {
  //     root.classList.add("dark");
  //     root.classList.remove("light");
  //     body.classList.add("dark");
  //     body.classList.remove("light");
  //     try {
  //       localStorage.setItem("darkMode", "true");
  //     } catch (e) {}
  //   } else {
  //     root.classList.remove("dark");
  //     root.classList.add("light");
  //     body.classList.remove("dark");
  //     body.classList.add("light");
  //     try {
  //       localStorage.setItem("darkMode", "false");
  //     } catch (e) {}
  //   }
  // }, [mode]);

  useEffect(() => {
    localStorage.setItem("theme", mode);
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
  }, [mode]);

  return null;
}
