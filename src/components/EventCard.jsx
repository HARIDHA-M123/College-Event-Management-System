import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function EventCard({ event }) {
  let imageUrl = "/assets/avatar.jpg";
  if (event && event.image) {
    const img = event.image;
    if (img.startsWith("http") || img.startsWith("//")) imageUrl = img;
    else {
      const trimmed = img.replace(/^\/+/, "");
      imageUrl = trimmed.startsWith("assets/") ? `/${trimmed}` : `/assets/${trimmed}`;
    }
  }
  return /* @__PURE__ */ React.createElement(motion.article, { layout: true, initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, whileHover: { y: -4 }, className: "group card bg-white dark:bg-slate-800 rounded-lg transition p-4" }, /* @__PURE__ */ React.createElement(Link, { to: `/events/${event.id}`, className: "flex gap-4 items-start" }, /* @__PURE__ */ React.createElement("div", { className: "w-28 h-20 flex-shrink-0 rounded-md overflow-hidden shadow-sm" }, /* @__PURE__ */ React.createElement("img", { src: imageUrl, alt: "", className: "w-full h-full object-cover" })), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold text-lg truncate" }, event.title), /* @__PURE__ */ React.createElement("span", { className: "text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded" }, event.type)), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-slate-500 mt-1 line-clamp-2" }, event.desc), /* @__PURE__ */ React.createElement("div", { className: "mt-2 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded" }, event.date), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-400" }, event.department), typeof event.attendeeCount === "number" && /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500 flex items-center gap-1" }, /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-3.5 w-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "7", r: "4" }), /* @__PURE__ */ React.createElement("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }), /* @__PURE__ */ React.createElement("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })), event.attendeeCount)))));
}
export {
  EventCard as default
};
