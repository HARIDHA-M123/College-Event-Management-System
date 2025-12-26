import React, { useEffect, useMemo, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import useStore from "../store";
import { useNavigate } from "react-router-dom";
function CalendarPopup({ events: propEvents = null, onClose } = {}) {
  const storeEvents = useStore((state) => state.events);
  const events = propEvents || storeEvents || [];
  const ref = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose && onClose();
    }
    function onDown(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) onClose && onClose();
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [onClose]);
  const fcEvents = useMemo(() => {
    return (events || []).map((e) => ({
      id: e.id || e._id || String(e.title || "event"),
      title: e.title || "Untitled",
      start: e.start || e.date || e.startDate || null
    })).filter((ev) => !!ev.start);
  }, [events]);
  const upcoming = useMemo(() => {
    return fcEvents.filter((ev) => new Date(ev.start) >= /* @__PURE__ */ new Date()).sort((a, b) => new Date(a.start) - new Date(b.start)).slice(0, 5);
  }, [fcEvents]);
  return /* @__PURE__ */ React.createElement("div", { ref, className: "absolute right-2 mt-2 w-96 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded shadow z-50 p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "font-semibold" }, "Upcoming"), /* @__PURE__ */ React.createElement("button", { onClick: onClose, className: "text-sm px-2" }, "Close")), /* @__PURE__ */ React.createElement("div", { className: "calendar-compact" }, /* @__PURE__ */ React.createElement(
    FullCalendar,
    {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      headerToolbar: { left: "prev", center: "title", right: "next" },
      height: "auto",
      contentHeight: "auto",
      dayMaxEventRows: 6,
      showNonCurrentDates: false,
      selectable: false,
      events: fcEvents,
      eventClick: (info) => {
        const id = info.event.id;
        if (id) navigate(`/events/${id}`);
      }
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "mt-2" }, upcoming.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, "No upcoming events"), upcoming.map((ev) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: ev.id,
      onClick: () => navigate(`/events/${ev.id}`),
      className: "text-sm p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer truncate",
      title: ev.title
    },
    /* @__PURE__ */ React.createElement("div", { className: "font-medium" }, ev.title),
    /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-400" }, ev.start ? new Date(ev.start).toLocaleString() : "TBA")
  ))));
}
export {
  CalendarPopup as default
};
