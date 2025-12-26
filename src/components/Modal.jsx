import React from "react";
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 bg-black/40 flex items-center justify-center z-50" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-slate-800 rounded-md p-4 max-w-lg w-full" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-end" }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, className: "px-2" }, "Close")), children));
}
export {
  Modal as default
};
