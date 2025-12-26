import React, { useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import useStore from "../store";
function CalendarPage() {
  const storeEvents = useStore((s) => s.events);
  const [draftEvents, setDraftEvents] = useState([]);
  const events = useMemo(() => {
    const mapped = (storeEvents || []).map((e) => ({ id: e.id || e._id, title: e.title || "Untitled", start: e.start || e.date || null }));
    return [...mapped.filter((ev) => !!ev.start), ...draftEvents];
  }, [storeEvents, draftEvents]);
  function handleDateSelect(selectInfo) {
    const title = prompt("Event title");
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      const newEvent = { id: `draft-${Date.now()}`, title, start: selectInfo.startStr };
      setDraftEvents((prev) => [...prev, newEvent]);
    }
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-semibold mb-4" }, "Calendar"), /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-slate-800 rounded p-4" }, /* @__PURE__ */ React.createElement(
    FullCalendar,
    {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      selectable: true,
      select: handleDateSelect,
      events
    }
  )));
}
export {
  CalendarPage as default
};
