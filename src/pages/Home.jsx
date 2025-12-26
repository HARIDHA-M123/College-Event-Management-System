import React, { useEffect, useState } from "react";
import { fetchEvents } from "../utils/mockApi";
import useStore from "../store";
import EventCard from "../components/EventCard";
import useRecommendations from "../hooks/useRecommendations";
import LoadingSkeleton from "../components/LoadingSkeleton";
import SearchFilters from "../components/SearchFilters";
import Carousel from "../components/Carousel";
function Home() {
  const [loading, setLoading] = useState(true);
  const setEvents = useStore((s) => s.setEvents);
  const events = useStore((s) => s.events);
  const addNotification = useStore((s) => s.addNotification);
  const filters = useStore((s) => s.filters);
  const filteredEvents = React.useMemo(() => {
    if (!events || !events.length) return [];
    return events.filter((e) => {
      if (filters.query && !`${e.title} ${e.desc}`.toLowerCase().includes(filters.query.toLowerCase())) return false;
      if (filters.date && e.date !== filters.date) return false;
      if (filters.type && filters.type !== "All" && e.type !== filters.type) return false;
      if (filters.department && filters.department !== "All" && e.department !== filters.department) return false;
      return true;
    });
  }, [events, filters]);
  const user = useStore((s) => s.user);
  const recs = useRecommendations(events, user);
  useEffect(() => {
    fetchEvents().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, events && events.length > 0 ? /* @__PURE__ */ React.createElement(
    Carousel,
    {
      slides: events.slice(0, 3).map((e) => ({
        src: e.image && (e.image.startsWith("http") || e.image.startsWith("//")) ? e.image : e.image ? e.image.replace(/^\/+/, "").startsWith("assets/") ? `/${e.image.replace(/^\/+/, "")}` : `/assets/${e.image.replace(/^\/+/, "")}` : "/assets/landing.jpg",
        title: e.title,
        subtitle: e.desc,
        cta: { href: `/events/${e.id}`, text: "View event" }
      })),
      interval: 5e3
    }
  ) : /* @__PURE__ */ React.createElement(
    Carousel,
    {
      slides: [
        { src: "/assets/landing.jpg", title: "Campus Events, made simple", subtitle: "Discover clubs, workshops and festivals. Join and create events with ease.", cta: { href: "/events", text: "View event" } },
        { src: "/assets/hackathon.jpg", title: "Hackathon Weekend", subtitle: "48 hours of coding. Build fast, ship faster.", cta: { href: "/events", text: "View event" } },
        { src: "/assets/workshop.jpg", title: "Hands-on Workshops", subtitle: "Practical sessions with industry experts.", cta: { href: "/events", text: "View event" } }
      ],
      interval: 5e3
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-semibold" }, "Home")), /* @__PURE__ */ React.createElement("section", { className: "grid md:grid-cols-3 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "md:col-span-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold" }, "Trending Events"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, "Showing ", events.length, " events")), /* @__PURE__ */ React.createElement(SearchFilters, null), loading ? /* @__PURE__ */ React.createElement(LoadingSkeleton, { className: "h-40" }) : /* @__PURE__ */ React.createElement("div", { className: "grid gap-3" }, (filteredEvents.length ? filteredEvents : events).map((e) => /* @__PURE__ */ React.createElement(EventCard, { key: e.id, event: e })))), /* @__PURE__ */ React.createElement("aside", null, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold mb-2" }, "Recommended for you"), loading ? /* @__PURE__ */ React.createElement(LoadingSkeleton, { className: "h-32" }) : /* @__PURE__ */ React.createElement("div", { className: "grid gap-3" }, recs.slice(0, 5).map((r) => /* @__PURE__ */ React.createElement(EventCard, { key: r.id, event: r }))))));
}
export {
  Home as default
};
