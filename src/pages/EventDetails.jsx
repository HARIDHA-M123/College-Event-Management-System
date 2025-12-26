import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEventById } from "../utils/mockApi";
import LoadingSkeleton from "../components/LoadingSkeleton";
import useStore from "../store";
import api, { setAuthToken } from "../utils/mockApi";
import EventFeedback from "../components/EventFeedback";
function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const addNotification = useStore((s) => s.addNotification);
  const allEvents = useStore((s) => s.events);
  useEffect(() => {
    setLoading(true);
    fetchEventById(id).then((e) => {
      setEvent(e);
      setLoading(false);
    }).catch((err) => {
      console.error("Failed to load event", err);
      setEvent(null);
      setLoading(false);
    });
  }, [id]);
  if (loading) return /* @__PURE__ */ React.createElement(LoadingSkeleton, { className: "h-64" });
  if (!event) return /* @__PURE__ */ React.createElement("div", null, "Event not found");
  const handleSave = () => {
    addNotification({ id: `n-${Date.now()}`, title: "Saved", text: `${event.title} saved to My Events`, date: (/* @__PURE__ */ new Date()).toISOString() });
  };
  const fee = typeof event?.fee === "number" ? event.fee : event?.fee ? Number(event.fee) : 0;
  const price = fee > 0 ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(fee) : "Free";
  const when = event?.date || event?.start || "";
  const time = event?.time || event?.startTime || "";
  let imageUrl = "/assets/avatar-placeholder.svg.jpg";
  if (event?.image) {
    const img = event.image;
    if (img.startsWith("http") || img.startsWith("//")) {
      imageUrl = img;
    } else {
      const trimmed = img.replace(/^\/+/, "");
      if (trimmed.startsWith("assets/")) imageUrl = `/${trimmed}`;
      else imageUrl = `/assets/${trimmed}`;
    }
  }
  return /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-4 py-6" }, /* @__PURE__ */ React.createElement("div", { className: "relative rounded-lg overflow-hidden mb-6" }, /* @__PURE__ */ React.createElement("img", { src: imageUrl, alt: "", className: "w-full h-64 md:h-80 object-cover" }), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" }), /* @__PURE__ */ React.createElement("div", { className: "absolute left-6 bottom-6 text-white" }, event?.justAdded && /* @__PURE__ */ React.createElement("div", { className: "inline-block bg-white/20 text-sm text-white px-3 py-1 rounded-md mb-3" }, "Just Added"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-white/80 mb-2" }, when ? new Date(when).toLocaleDateString(void 0, { weekday: "long", month: "long", day: "numeric" }) : "Date TBA"), /* @__PURE__ */ React.createElement("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight text-white" }, event?.title), /* @__PURE__ */ React.createElement("p", { className: "mt-3 max-w-2xl text-white/90 font-medium" }, event?.desc))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8" }, /* @__PURE__ */ React.createElement("main", { className: "lg:col-span-2" }, /* @__PURE__ */ React.createElement("section", { className: "mb-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Date and time"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 text-sm text-slate-700 mb-2" }, /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-slate-500", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }), /* @__PURE__ */ React.createElement("line", { x1: "16", y1: "2", x2: "16", y2: "6" }), /* @__PURE__ */ React.createElement("line", { x1: "8", y1: "2", x2: "8", y2: "6" }), /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "10", x2: "21", y2: "10" })), /* @__PURE__ */ React.createElement("div", { className: "text-sm" }, when ? new Date(when).toLocaleDateString() : "Date TBA", " ", time ? `\u2022 ${time}` : ""))), /* @__PURE__ */ React.createElement("section", { className: "mb-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Location"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 text-sm text-slate-700" }, /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-slate-500", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0z" })), /* @__PURE__ */ React.createElement("div", { className: "text-sm" }, event.location || event.venue || "Online"))), /* @__PURE__ */ React.createElement("section", { className: "mb-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Good to know"), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-6 bg-white dark:bg-slate-800 rounded card" }, /* @__PURE__ */ React.createElement("h4", { className: "font-semibold mb-2" }, "Highlights"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-600 flex flex-col gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 text-slate-500", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" })), " ", /* @__PURE__ */ React.createElement("span", null, event?.duration || "2 hours")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 text-slate-500", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" })), " ", /* @__PURE__ */ React.createElement("span", null, event.location || event.venue ? "Onsite" : "Online")))), /* @__PURE__ */ React.createElement("div", { className: "p-6 bg-white dark:bg-slate-800 rounded card" }, /* @__PURE__ */ React.createElement("h4", { className: "font-semibold mb-2" }, "Refund Policy"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-600" }, "Refunds up to 7 days before event")))), /* @__PURE__ */ React.createElement("section", { className: "mb-8" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-semibold mb-4" }, "About this event"), /* @__PURE__ */ React.createElement("div", { className: "prose dark:prose-invert max-w-none text-slate-700" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium" }, event?.summary || "Welcome to our event!"), /* @__PURE__ */ React.createElement("p", { className: "mt-3" }, event?.longDesc || event?.desc || "Details coming soon."))), /* @__PURE__ */ React.createElement("section", { className: "mb-12" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Tags"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-3" }, (event?.tags || ["Online Events", "Things To Do Online", "#jokes"]).map((t, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm" }, t)))), /* @__PURE__ */ React.createElement("section", { className: "mb-12" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Organized by"), (() => {
    const organizerName = typeof event.organizer === "string" ? event.organizer : event.organizer?.name || "Campus Events";
    const derivedTotal = (allEvents || []).filter((e) => e.organizer === organizerName || e.organizer && e.organizer.name === organizerName).length;
    const totalByOrganizer = typeof event.organizerEventsCount === "number" ? event.organizerEventsCount : derivedTotal;
    return /* @__PURE__ */ React.createElement("div", { className: "p-5 bg-white dark:bg-slate-800 rounded card" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 rounded-full bg-gradient-to-br from-brand to-brand/60 flex items-center justify-center text-white font-semibold text-lg" }, /* @__PURE__ */ React.createElement("img", { src: event.organizerAvatar || "/assets/avatar.jpg", alt: "organizer", className: "w-16 h-16 rounded-full object-cover" })), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "font-semibold text-lg" }, organizerName), /* @__PURE__ */ React.createElement("div", { className: "text-xs uppercase tracking-wide text-slate-500" }, "Organizer"), /* @__PURE__ */ React.createElement("div", { className: "mt-1 text-sm text-slate-600" }, totalByOrganizer, " event", totalByOrganizer === 1 ? "" : "s", " hosted"))));
  })()), /* @__PURE__ */ React.createElement(EventFeedback, { eventId: event.id })), /* @__PURE__ */ React.createElement("aside", { className: "lg:col-span-1" }, /* @__PURE__ */ React.createElement("div", { className: "sticky top-24" }, /* @__PURE__ */ React.createElement("div", { className: "p-6 bg-white dark:bg-slate-800 rounded card flex flex-col gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, price), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-semibold" }, price), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-400" }, when, time ? ` \u2022 ${time}` : ""), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-sm text-slate-600" }, /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "7", r: "4" }), /* @__PURE__ */ React.createElement("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }), /* @__PURE__ */ React.createElement("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })), /* @__PURE__ */ React.createElement("span", null, typeof event?.attendeeCount === "number" ? event.attendeeCount : Array.isArray(event?.attendees) ? event.attendees.length : 0, " registered")), /* @__PURE__ */ React.createElement("div", { className: "pt-2" }, /* @__PURE__ */ React.createElement("button", { onClick: async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please sign in to register");
    try {
      const mask = token ? `${token.slice(0, 6)}...${token.slice(-6)}` : "<none>";
      console.log("Attempting register; local token (masked)=", mask);
      const dbg = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api/debug/token`, {
        headers: { "Authorization": `Bearer ${token}` }
      }).then((r) => r.json()).catch((e) => ({ error: e && e.message }));
      console.log("Backend debug response:", dbg);
    } catch (e) {
      console.warn("Debug fetch failed", e);
    }
    setAuthToken(token);
    try {
      const r = await api.post(`/api/events/${event.id}/attend`);
      if (r?.data?.user) {
        useStore.getState().setUser(r.data.user);
      }
      if (r?.data?.event) {
        const ev = r.data.event;
        setEvent((prev) => ({
          ...prev,
          attendeeCount: Array.isArray(ev.attendees) ? ev.attendees.length : typeof ev.attendeesCount === "number" ? ev.attendeesCount : prev && prev.attendeeCount || 0
        }));
      }
      alert("Registration confirmed. A confirmation email has been sent if email is available.");
    } catch (err) {
      console.error(err);
      const status = err?.response?.status;
      if (status === 401) {
        localStorage.removeItem("token");
        setAuthToken(null);
        useStore.getState().setUser(null);
        alert("Session expired, please sign in again");
        return navigate("/login");
      }
      const msg = err?.response?.data?.message || err?.message || "Registration failed";
      alert(msg);
    }
  }, className: "w-full btn btn-primary" }, "Register")))))));
}
export {
  EventDetails as default
};
