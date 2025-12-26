import React from "react";
import useStore from "../store";
function SearchFilters() {
  const filters = useStore((s) => s.filters);
  const setFilter = useStore((s) => s.setFilter);
  return /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-slate-800 p-3 rounded mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-2" }, /* @__PURE__ */ React.createElement("input", { value: filters.query, onChange: (e) => setFilter({ query: e.target.value }), placeholder: "Search events", className: "p-2 rounded" }), /* @__PURE__ */ React.createElement("input", { type: "date", value: filters.date, onChange: (e) => setFilter({ date: e.target.value }), className: "p-2 rounded" }), /* @__PURE__ */ React.createElement("select", { value: filters.type, onChange: (e) => setFilter({ type: e.target.value }), className: "p-2 rounded" }, /* @__PURE__ */ React.createElement("option", null, "All"), /* @__PURE__ */ React.createElement("option", null, "Talk"), /* @__PURE__ */ React.createElement("option", null, "Festival"), /* @__PURE__ */ React.createElement("option", null, "Workshop")), /* @__PURE__ */ React.createElement("select", { value: filters.department, onChange: (e) => setFilter({ department: e.target.value }), className: "p-2 rounded" }, /* @__PURE__ */ React.createElement("option", null, "All"), /* @__PURE__ */ React.createElement("option", null, "Computer Science"), /* @__PURE__ */ React.createElement("option", null, "Arts"), /* @__PURE__ */ React.createElement("option", null, "Business"))));
}
export {
  SearchFilters as default
};
