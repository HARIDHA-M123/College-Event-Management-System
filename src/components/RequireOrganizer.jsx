import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "../store";
function RequireOrganizer({ children }) {
  const user = useStore((state) => state.user);
  if (!user || !["organizer", "admin"].includes(user.role)) {
    return /* @__PURE__ */ React.createElement(Navigate, { to: "/", replace: true });
  }
  return children;
}
export {
  RequireOrganizer as default
};
