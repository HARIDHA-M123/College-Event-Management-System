import React from "react";
import { NavLink } from "react-router-dom";
import useStore from "../store";
function Sidebar() {
  const user = useStore((state) => state.user);
  const isOrganizer = ["organizer", "admin"].includes(user?.role);
  const isAdmin = user?.role === "admin";
  const routes = [
    { to: "/", label: "Home" },
    { to: "/my-events", label: "My Events" },
    { to: "/calendar", label: "Calendar" },
    // only show create for organizer/admin
    ...isOrganizer ? [{ to: "/create", label: "Create Event" }] : [],
    // only show admin link for admin
    ...isAdmin ? [{ to: "/admin", label: "Analysis" }] : [],
    { to: "/profile", label: "Profile" }
  ];
  return /* @__PURE__ */ React.createElement("aside", { className: "w-16 md:w-64 bg-white dark:bg-slate-800 border-r dark:border-slate-700 p-3" }, /* @__PURE__ */ React.createElement("nav", { className: "flex flex-col gap-2" }, routes.map((r) => /* @__PURE__ */ React.createElement(NavLink, { key: r.to, to: r.to, className: ({ isActive }) => `flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 ${isActive ? "bg-slate-100 dark:bg-slate-700 font-semibold" : ""}` }, /* @__PURE__ */ React.createElement("span", { className: "w-8 text-center" }, "\u2022"), /* @__PURE__ */ React.createElement("span", { className: "hidden md:inline" }, r.label)))));
}
export {
  Sidebar as default
};
