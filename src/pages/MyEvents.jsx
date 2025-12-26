import React, { useEffect, useState } from "react";
import useStore from "../store";
import EventCard from "../components/EventCard";
import { fetchEvents } from "../utils/mockApi";
function MyEvents() {
  const events = useStore((s) => s.events);
  const setEvents = useStore((s) => s.setEvents);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!events || events.length === 0) {
      fetchEvents().then((data) => {
        setEvents(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-semibold mb-4" }, "My Events"), /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold mb-2" }, "Participated"), loading ? /* @__PURE__ */ React.createElement("div", null, "Loading...") : /* @__PURE__ */ React.createElement("div", { className: "grid gap-3" }, events.map((e) => /* @__PURE__ */ React.createElement(EventCard, { key: e.id, event: e })))));
}
export {
  MyEvents as default
};
