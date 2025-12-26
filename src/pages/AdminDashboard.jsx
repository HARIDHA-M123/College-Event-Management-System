import React, { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { fetchEvents } from "../utils/mockApi";
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function groupByMonth(events) {
  const counts = Array(12).fill(0);
  events.forEach((e) => {
    const date = e.date ? new Date(e.date) : e.createdAt ? new Date(e.createdAt) : null;
    if (!date || isNaN(date.getTime())) return;
    counts[date.getMonth()]++;
  });
  return counts.map((c, i) => ({ name: monthNames[i], events: c }));
}
function computeTopOrganizers(events, limit = 5) {
  const map = /* @__PURE__ */ new Map();
  events.forEach((e) => {
    const org = e.organizer || "Unknown";
    const cur = map.get(org) || { name: org, events: 0, popularity: 0 };
    cur.events += 1;
    cur.popularity += e.popularity || 0;
    map.set(org, cur);
  });
  return Array.from(map.values()).sort((a, b) => b.events - a.events).slice(0, limit);
}
function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchEvents().then((data) => {
      if (!mounted) return;
      setEvents(data || []);
      setLoading(false);
    }).catch((err) => {
      if (!mounted) return;
      setError(err && err.message || "Failed to load");
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);
  const monthly = useMemo(() => groupByMonth(events), [events]);
  const topOrgs = useMemo(() => computeTopOrganizers(events, 5), [events]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-semibold mb-4" }, "Admin Analytics"), loading ? /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement(LoadingSkeleton, { className: "h-48 w-full" }), /* @__PURE__ */ React.createElement(LoadingSkeleton, { className: "h-32 w-full" })) : error ? /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-red-50 text-red-800 rounded" }, "Error loading data: ", error) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "grid md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-slate-800 rounded" }, /* @__PURE__ */ React.createElement("h4", { className: "font-semibold mb-2" }, "Events Over Time"), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 200 }, /* @__PURE__ */ React.createElement(LineChart, { data: monthly }, /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name" }), /* @__PURE__ */ React.createElement(YAxis, null), /* @__PURE__ */ React.createElement(Tooltip, null), /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "events", stroke: "#4f46e5" })))), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-slate-800 rounded" }, /* @__PURE__ */ React.createElement("h4", { className: "font-semibold mb-2" }, "Top Organizers (by # events)"), /* @__PURE__ */ React.createElement(BarChart, { width: 300, height: 200, data: topOrgs }, /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name" }), /* @__PURE__ */ React.createElement(YAxis, null), /* @__PURE__ */ React.createElement(Tooltip, null), /* @__PURE__ */ React.createElement(Bar, { dataKey: "events", fill: "#4f46e5" })))), /* @__PURE__ */ React.createElement("div", { className: "mt-4" }, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold" }, "Top Events (by popularity)"), /* @__PURE__ */ React.createElement("div", { className: "grid gap-2 mt-2" }, events.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-white dark:bg-slate-800 rounded" }, "No events available") : events.slice().sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, 5).map((ev) => /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-white dark:bg-slate-800 rounded flex justify-between", key: ev.id || ev._id }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "font-medium" }, ev.title), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, ev.organizer || "Unknown", " \u2022 ", ev.date || (ev.createdAt ? new Date(ev.createdAt).toLocaleDateString() : "")), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-500 flex items-center gap-1 mt-1" }, /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-3.5 w-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "7", r: "4" }), /* @__PURE__ */ React.createElement("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }), /* @__PURE__ */ React.createElement("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })), /* @__PURE__ */ React.createElement("span", null, typeof ev.attendeeCount === "number" ? ev.attendeeCount : Array.isArray(ev.attendees) ? ev.attendees.length : 0, " registered"))), /* @__PURE__ */ React.createElement("div", { className: "text-right ml-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-400" }, "Popularity"), /* @__PURE__ */ React.createElement("div", { className: "font-semibold" }, ev.popularity || 0))))))));
}
export {
  AdminDashboard as default
};
