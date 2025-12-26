import React, { useMemo, useState } from "react";
import useStore from "../store";
import Toggle from "../components/Toggle";
import EventCard from "../components/EventCard";
function Profile() {
  const user = useStore((s) => s.user);
  const events = useStore((s) => s.events);
  const notifications = useStore((s) => s.notifications);
  const eventsAttended = React.useMemo(() => {
    if (!events || !events.length) return 0;
    return events.filter((e) => (e.attendees || []).includes(user.id)).length;
  }, [events, user.id]);
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);
  const [showAllMy, setShowAllMy] = useState(false);
  const myEvents = useMemo(() => (events || []).filter((e) => e.organizer === user.name), [events, user.name]);
  const savedEventTitles = useMemo(() => (notifications || []).filter((n) => n.title === "Saved").map((n) => n.text.replace(" saved to My Events", "")), [notifications]);
  const savedEvents = useMemo(() => (events || []).filter((e) => savedEventTitles.includes(e.title)), [events, savedEventTitles]);
  return /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "p-6 bg-white dark:bg-slate-800 rounded card mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "w-20 h-20 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center" }, (() => {
    let avatar = "/assets/avatar.jpg";
    if (user && user.avatar) {
      const a = user.avatar;
      if (a.startsWith("http") || a.startsWith("//")) avatar = a;
      else {
        const t = a.replace(/^\/+/, "");
        avatar = t.startsWith("assets/") ? `/${t}` : `/assets/${t}`;
      }
    }
    return /* @__PURE__ */ React.createElement("img", { src: avatar, alt: "avatar", className: "w-20 h-20 object-cover" });
  })()), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-semibold" }, user.name), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, user.role)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500 mb-2" }, "Theme"), /* @__PURE__ */ React.createElement(Toggle, { checked: theme === "dark", onChange: toggleTheme })))), /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-semibold mb-3" }, "My Events"), myEvents.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-slate-800 rounded" }, "You haven't created any events yet.") : /* @__PURE__ */ React.createElement("div", { className: "grid gap-3" }, (showAllMy ? myEvents : myEvents.slice(0, 3)).map((e) => /* @__PURE__ */ React.createElement(EventCard, { key: e.id, event: e })), myEvents.length > 3 && /* @__PURE__ */ React.createElement("button", { onClick: () => setShowAllMy((s) => !s), className: "mt-2 text-sm text-brand" }, showAllMy ? "Show less" : `Show all (${myEvents.length})`))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-semibold mb-3" }, "Saved Events"), savedEvents.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-slate-800 rounded" }, "No saved events yet.") : /* @__PURE__ */ React.createElement("div", { className: "grid gap-3" }, savedEvents.map((e) => /* @__PURE__ */ React.createElement(EventCard, { key: e.id, event: e }))))), /* @__PURE__ */ React.createElement("aside", { className: "w-80" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-slate-800 rounded card mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "font-semibold" }, "Quick Stats"), /* @__PURE__ */ React.createElement("div", { className: "mt-3 text-sm text-slate-600" }, "Events created: ", /* @__PURE__ */ React.createElement("strong", null, myEvents.length)), /* @__PURE__ */ React.createElement("div", { className: "mt-1 text-sm text-slate-600" }, "Saved events: ", /* @__PURE__ */ React.createElement("strong", null, savedEvents.length)), /* @__PURE__ */ React.createElement("div", { className: "mt-1 text-sm text-slate-600" }, "Events attended: ", /* @__PURE__ */ React.createElement("strong", null, eventsAttended))), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-white dark:bg-slate-800 rounded card" }, /* @__PURE__ */ React.createElement("div", { className: "font-semibold mb-2" }, "Activity"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-600" }, (notifications || []).slice(0, 6).map((n, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "py-2 border-b last:border-b-0 border-slate-100 dark:border-slate-700" }, n.title, ": ", /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500" }, n.text))), (!notifications || notifications.length === 0) && /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, "No recent activity"))))));
}
export {
  Profile as default
};
