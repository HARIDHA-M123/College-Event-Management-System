import React from "react";
import useStore from "../store";
function Notifications() {
  const notes = useStore((s) => s.notifications);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-semibold mb-4" }, "Notifications"), /* @__PURE__ */ React.createElement("div", { className: "grid gap-2 max-w-2xl" }, notes.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-slate-800 rounded" }, "No notifications") : notes.map((n, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "p-3 bg-white dark:bg-slate-800 rounded flex justify-between items-start" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-semibold" }, n.title || "Update"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, n.text)), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-400" }, n.time || "")))));
}
export {
  Notifications as default
};
