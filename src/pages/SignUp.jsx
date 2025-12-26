import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useStore from "../store";
import api, { signup as apiSignup, setAuthToken } from "../utils/mockApi";
function SignUp() {
  const navigate = useNavigate();
  const setUser = useStore((s) => s.setUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("student");
  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    apiSignup({ name, email, password, role }).then((data) => {
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
      alert(err?.response?.data?.message || "Signup failed");
    });
  }
  return /* @__PURE__ */ React.createElement("div", { className: "max-w-md mx-auto mt-12" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-semibold mb-4" }, "Create account"), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, className: "bg-white dark:bg-slate-800 p-6 rounded grid gap-3" }, /* @__PURE__ */ React.createElement("input", { value: name, onChange: (e) => setName(e.target.value), className: "p-2 rounded", placeholder: "Full name" }), /* @__PURE__ */ React.createElement("input", { value: email, onChange: (e) => setEmail(e.target.value), className: "p-2 rounded", placeholder: "Email" }), /* @__PURE__ */ React.createElement("input", { type: "password", value: password, onChange: (e) => {
    setPassword(e.target.value);
    setError("");
  }, className: "p-2 rounded", placeholder: "Password" }), /* @__PURE__ */ React.createElement("input", { type: "password", value: confirm, onChange: (e) => {
    setConfirm(e.target.value);
    setError("");
  }, className: "p-2 rounded", placeholder: "Confirm password" }), error && /* @__PURE__ */ React.createElement("div", { className: "text-sm text-red-500" }, error), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-sm mr-2" }, "Role"), /* @__PURE__ */ React.createElement("select", { value: role, onChange: (e) => setRole(e.target.value), className: "p-2 rounded" }, /* @__PURE__ */ React.createElement("option", { value: "student" }, "Student"), /* @__PURE__ */ React.createElement("option", { value: "organizer" }, "Organizer"), /* @__PURE__ */ React.createElement("option", { value: "admin" }, "Admin"))), /* @__PURE__ */ React.createElement("button", { type: "submit", disabled: !password || !confirm, className: "px-4 py-2 bg-brand text-white rounded disabled:opacity-50" }, "Create account"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, "Already have an account? ", /* @__PURE__ */ React.createElement(Link, { to: "/login", className: "text-brand" }, "Sign in"))));
}
export {
  SignUp as default
};
