export const isBrowser = () => typeof window !== "undefined";

export const getDarkMode = () => {
  if (!isBrowser()) return false;
  return localStorage.getItem("darkMode") === "true";
};
