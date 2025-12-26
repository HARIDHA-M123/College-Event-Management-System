import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useStore from "../store";
import api, { login as apiLogin, setAuthToken } from "../utils/mockApi";
function Login() {
  const navigate = useNavigate();
  const setUser = useStore((s) => s.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  function handleSubmit(e) {
    e.preventDefault();
    apiLogin({ email, password }).then((data) => {
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        setAuthToken(data.token);
        setUser(data.user);
        const r = data.user.role;
        if (r === "admin") navigate("/admin");
        else if (r === "organizer") navigate("/my-events");
        else navigate("/");
      }
    }).catch((err) => {
      console.error(err);
      alert(err?.response?.data?.message || "Login failed");
    });
  }
  return /* @__PURE__ */ React.createElement("div", { className: "max-w-md mx-auto mt-12" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-semibold mb-4" }, "Sign in"), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, className: "bg-white dark:bg-slate-800 p-6 rounded grid gap-3" }, /* @__PURE__ */ React.createElement("input", { value: email, onChange: (e) => setEmail(e.target.value), className: "p-2 rounded", placeholder: "Email" }), /* @__PURE__ */ React.createElement("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "p-2 rounded", placeholder: "Password" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-sm mr-2" }, "Role"), /* @__PURE__ */ React.createElement("select", { value: role, onChange: (e) => setRole(e.target.value), className: "p-2 rounded" }, /* @__PURE__ */ React.createElement("option", { value: "student" }, "Student"), /* @__PURE__ */ React.createElement("option", { value: "organizer" }, "Organizer"), /* @__PURE__ */ React.createElement("option", { value: "admin" }, "Admin"))), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "px-4 py-2 bg-brand text-white rounded" }, "Sign in"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, "Don't have an account? ", /* @__PURE__ */ React.createElement(Link, { to: "/signup", className: "text-brand" }, "Sign up"))));
}
export {
  Login as default
};
