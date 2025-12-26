import React from "react";
function LoadingSkeleton({ className = "h-6 w-full" }) {
  return /* @__PURE__ */ React.createElement("div", { className: `animate-pulse bg-slate-200 dark:bg-slate-700 rounded ${className}` });
}
export {
  LoadingSkeleton as default
};
