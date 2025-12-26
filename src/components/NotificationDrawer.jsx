import React from "react";
import useStore from "../store";
function NotificationDrawer() {
  const notes = useStore((s) => s.notifications);
  return /* @__PURE__ */ React.createElement("div", { className: "w-16 md:w-80 p-3 bg-white dark:bg-slate-800 border-l dark:border-slate-700" }, /* @__PURE__ */ React.createElement("h3", { className: "hidden md:block font-semibold mb-2" }, "Notifications"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-2" }, notes.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, "No notifications") : notes.map((n, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "p-2 rounded-md bg-slate-50 dark:bg-slate-700" }, n.text))));
}
export {
  NotificationDrawer as default
};
