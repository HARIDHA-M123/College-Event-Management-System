import React from "react";
import useStore from "../store";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import CalendarPopup from "./CalendarPopup";
import { setAuthToken } from "../utils/mockApi";
function Topbar() {
  const user = useStore((s) => s.user);
  const isOrganizer = user && ["organizer", "admin"].includes(user.role);
  const isAdmin = user && user.role === "admin";
  const nav = [
    { to: "/", label: "Home" },
    { to: "/my-events", label: "My Events" },
    // create only if organizer/admin
    ...isOrganizer ? [{ to: "/create", label: "Create" }] : [],
    // analysis only if admin
    ...isAdmin ? [{ to: "/admin", label: "Analysis" }] : []
  ];
  const notes = useStore((s) => s.notifications);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    setAuthToken(null);
    useStore.getState().setUser(null);
    navigate("/");
  }
  return /* @__PURE__ */ React.createElement("header", { className: "w-full bg-white dark:bg-slate-800 border-b dark:border-slate-700" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-4 py-3 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-6" }, /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-semibold text-brand" }, "College Events"), /* @__PURE__ */ React.createElement("nav", { className: "hidden sm:flex gap-3" }, nav.map((n) => /* @__PURE__ */ React.createElement(NavLink, { key: n.to, to: n.to, className: ({ isActive }) => `px-3 py-1 rounded ${isActive ? "bg-slate-100 dark:bg-slate-700" : "hover:bg-slate-50 dark:hover:bg-slate-700"}` }, n.label)))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "relative flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setCalendarOpen((v) => !v), className: "px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700", title: "Calendar" }, /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }), /* @__PURE__ */ React.createElement("line", { x1: "16", y1: "2", x2: "16", y2: "6" }), /* @__PURE__ */ React.createElement("line", { x1: "8", y1: "2", x2: "8", y2: "6" }), /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "10", x2: "21", y2: "10" }))), calendarOpen && /* @__PURE__ */ React.createElement(CalendarPopup, { onClose: () => setCalendarOpen(false) })), /* @__PURE__ */ React.createElement(NavLink, { to: "/notifications", className: "relative px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700", title: "Notifications" }, /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-slate-700 dark:text-slate-300", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v0.68C7.64 5.36 6 7.93 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" })), notes && notes.length > 0 && /* @__PURE__ */ React.createElement("span", { className: "absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full px-1" }, notes.length)), localStorage.getItem("token") ? /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(NavLink, { to: "/profile", className: "flex items-center gap-2" }, (() => {
    let avatar = "/assets/avatar.jpg";
    if (user && user.avatar) {
      const a = user.avatar;
      if (a.startsWith("http") || a.startsWith("//")) avatar = a;
      else {
        const t = a.replace(/^\/+/, "");
        avatar = t.startsWith("assets/") ? `/${t}` : `/assets/${t}`;
      }
    }
    return /* @__PURE__ */ React.createElement("img", { src: avatar, alt: "profile", className: "w-8 h-8 rounded-full object-cover" });
  })()), /* @__PURE__ */ React.createElement("button", { onClick: handleLogout, title: "Logout", className: "px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-sm" }, "Logout")) : /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(NavLink, { to: "/login", className: "px-3 py-1 border rounded text-sm" }, "Sign in"), /* @__PURE__ */ React.createElement(NavLink, { to: "/signup", className: "px-3 py-1 bg-brand text-white rounded text-sm" }, "Get started"))))));
}
export {
  Topbar as default
};
