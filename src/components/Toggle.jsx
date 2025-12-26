import React from "react";
import useStore from "../store";
function Toggle() {
  const theme = useStore((s) => s.theme);
  const toggle = useStore((s) => s.toggleTheme);
  return /* @__PURE__ */ React.createElement("button", { onClick: toggle, className: "px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-700" }, theme === "dark" ? "Dark" : "Light");
}
export {
  Toggle as default
};
