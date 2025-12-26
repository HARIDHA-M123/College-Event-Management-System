import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./components/Topbar";
import useStore from "./store";

export default function App() {
  const theme = useStore((state) => state.theme);
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <div className="app-shell bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen">
      <Topbar />
      <div className="flex">
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
