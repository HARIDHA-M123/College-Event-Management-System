import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store";
import api from "../utils/mockApi";
function CreateEvent() {
  const setEvents = useStore((s) => s.setEvents);
  const addNotification = useStore((s) => s.addNotification);
  const events = useStore((s) => s.events);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    category: "Technical",
    organizer: "",
    department: "Computer Science",
    start: "",
    end: "",
    deadline: "",
    venue: "",
    mode: "Offline",
    maxParticipants: "",
    teamType: "Solo",
    rules: "",
    fee: "",
    tags: [],
    contact: ""
  });
  const [bannerPreview, setBannerPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [step, setStep] = useState(1);
  function onBanner(e) {
    const f = e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setBannerPreview(url);
  }
  function onGallery(e) {
    const files = Array.from(e.target.files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setGalleryPreviews(urls);
  }
  function addTag() {
    const t = tagInput.trim();
    if (!t) return;
    if (!form.tags.includes(t)) setForm({ ...form, tags: [...form.tags, t] });
    setTagInput("");
  }
  function removeTag(t) {
    setForm({ ...form, tags: form.tags.filter((x) => x !== t) });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (step === 1) {
      if (!form.title) return alert("Title is required");
      if (!form.venue) return alert("Venue / Location is required");
      setStep(2);
      return;
    }
    const payload = {
      title: form.title,
      desc: form.desc,
      type: form.category,
      department: form.department,
      date: form.start ? form.start.split("T")[0] : "",
      startTime: form.start,
      endTime: form.end,
      deadline: form.deadline,
      location: form.venue,
      mode: form.mode,
      maxParticipants: form.maxParticipants,
      teamType: form.teamType,
      rules: form.rules,
      fee: Number(form.fee) || 0,
      image: bannerPreview || "/assets/event1.jpg",
      gallery: galleryPreviews,
      tags: form.tags,
      contact: form.contact
    };
    const user = useStore.getState().user;
    const token = localStorage.getItem("token");
    if (!user || !user.id || !token) {
      if (!window.confirm("You are not signed in. Events created now will only exist locally in your browser and will NOT be saved to the server. Continue?")) return;
      const newEvent = {
        id: "ev" + Date.now(),
        title: form.title,
        desc: form.desc,
        type: form.category,
        department: form.department,
        date: form.start ? form.start.split("T")[0] : "",
        start: form.start,
        end: form.end,
        deadline: form.deadline,
        venue: form.venue,
        mode: form.mode,
        maxParticipants: form.maxParticipants,
        teamType: form.teamType,
        rules: form.rules,
        fee: form.fee,
        image: bannerPreview || "/assets/event1.jpg",
        gallery: galleryPreviews,
        tags: form.tags,
        organizer: form.organizer,
        contact: form.contact,
        popularity: 0
      };
      setEvents([newEvent, ...events]);
      addNotification({ title: "Event Created", text: `${newEvent.title} was created`, time: (/* @__PURE__ */ new Date()).toLocaleTimeString() });
      alert("Event created (mock).");
    } else {
      api.post("/api/events", payload).then((r) => {
        const ev = r.data.event || r.data;
        const mapped = { ...ev, id: ev._id, organizer: ev.organizer ? { ...ev.organizer, id: ev.organizer._id } : void 0 };
        setEvents([mapped, ...events]);
        addNotification({ title: "Event Created", text: `${mapped.title} was created`, time: (/* @__PURE__ */ new Date()).toLocaleTimeString() });
        alert("Event created.");
      }).catch((err) => {
        console.error("Create event failed", err);
        alert(err?.response?.data?.message || "Could not create event");
      });
    }
    setForm({
      title: "",
      desc: "",
      category: "Technical",
      organizer: "",
      department: "Computer Science",
      start: "",
      end: "",
      deadline: "",
      venue: "",
      mode: "Offline",
      maxParticipants: "",
      teamType: "Solo",
      rules: "",
      fee: "",
      tags: [],
      contact: ""
    });
    setBannerPreview(null);
    setGalleryPreviews([]);
  }
  return /* @__PURE__ */ React.createElement("div", { className: "flex justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-4xl" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-semibold mb-4" }, "Create Event"), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, className: "bg-white dark:bg-slate-800 p-4 rounded grid gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm font-medium" }, "Step ", step, " of 2"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, step === 1 ? "Basic info" : "Details & media")), step === 1 ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("input", { value: form.title, onChange: (e) => setForm({ ...form, title: e.target.value }), className: "p-2 rounded", placeholder: "Event Name" }), /* @__PURE__ */ React.createElement("div", { className: "grid md:grid-cols-2 gap-2" }, /* @__PURE__ */ React.createElement("input", { value: form.organizer, onChange: (e) => setForm({ ...form, organizer: e.target.value }), className: "p-2 rounded", placeholder: "Organizer / Club Name" }), /* @__PURE__ */ React.createElement("input", { value: form.contact, onChange: (e) => setForm({ ...form, contact: e.target.value }), className: "p-2 rounded", placeholder: "Organizer Contact Info (phone/email)" })), /* @__PURE__ */ React.createElement("div", { className: "grid md:grid-cols-2 gap-2" }, /* @__PURE__ */ React.createElement("input", { value: form.venue, onChange: (e) => setForm({ ...form, venue: e.target.value }), className: "p-2 rounded", placeholder: "Venue / Location" }), /* @__PURE__ */ React.createElement("select", { value: form.department, onChange: (e) => setForm({ ...form, department: e.target.value }), className: "p-2 rounded" }, /* @__PURE__ */ React.createElement("option", null, "Computer Science"), /* @__PURE__ */ React.createElement("option", null, "Arts"), /* @__PURE__ */ React.createElement("option", null, "Business"), /* @__PURE__ */ React.createElement("option", null, "Mathematics"), /* @__PURE__ */ React.createElement("option", null, "Physics"))), /* @__PURE__ */ React.createElement("select", { value: form.category, onChange: (e) => setForm({ ...form, category: e.target.value }), className: "p-2 rounded" }, /* @__PURE__ */ React.createElement("option", null, "Technical"), /* @__PURE__ */ React.createElement("option", null, "Cultural"), /* @__PURE__ */ React.createElement("option", null, "Sports"), /* @__PURE__ */ React.createElement("option", null, "Workshop"), /* @__PURE__ */ React.createElement("option", null, "Seminar")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end gap-2" }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setStep(1), className: "px-3 py-1 border rounded bg-slate-100" }, "Cancel"), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "px-4 py-2 bg-brand text-white rounded" }, "Next"))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("textarea", { value: form.desc, onChange: (e) => setForm({ ...form, desc: e.target.value }), className: "p-2 rounded", placeholder: "Description (textarea)", rows: 4 }), /* @__PURE__ */ React.createElement("div", { className: "grid md:grid-cols-3 gap-2" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm" }, "Start Date & Time ", /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-400" }, "(When the event begins)")), /* @__PURE__ */ React.createElement("input", { type: "datetime-local", value: form.start, onChange: (e) => setForm({ ...form, start: e.target.value }), className: "p-2 rounded w-full" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm" }, "End Date & Time ", /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-400" }, "(When the event finishes)")), /* @__PURE__ */ React.createElement("input", { type: "datetime-local", value: form.end, onChange: (e) => setForm({ ...form, end: e.target.value }), className: "p-2 rounded w-full" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm" }, "Registration Deadline ", /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-400" }, "(Last date/time participants can register)")), /* @__PURE__ */ React.createElement("input", { type: "datetime-local", value: form.deadline, onChange: (e) => setForm({ ...form, deadline: e.target.value }), className: "p-2 rounded w-full" }))), /* @__PURE__ */ React.createElement("div", { className: "grid md:grid-cols-2 gap-2" }, /* @__PURE__ */ React.createElement("select", { value: form.mode, onChange: (e) => setForm({ ...form, mode: e.target.value }), className: "p-2 rounded" }, /* @__PURE__ */ React.createElement("option", null, "Offline"), /* @__PURE__ */ React.createElement("option", null, "Online"), /* @__PURE__ */ React.createElement("option", null, "Hybrid"))), /* @__PURE__ */ React.createElement("div", { className: "grid md:grid-cols-3 gap-2" }, /* @__PURE__ */ React.createElement("input", { type: "number", value: form.maxParticipants, onChange: (e) => setForm({ ...form, maxParticipants: e.target.value }), className: "p-2 rounded", placeholder: "Max Participants (number)" }), /* @__PURE__ */ React.createElement("select", { value: form.teamType, onChange: (e) => setForm({ ...form, teamType: e.target.value }), className: "p-2 rounded" }, /* @__PURE__ */ React.createElement("option", null, "Solo"), /* @__PURE__ */ React.createElement("option", null, "Team")), /* @__PURE__ */ React.createElement("input", { value: form.fee, onChange: (e) => setForm({ ...form, fee: e.target.value }), className: "p-2 rounded", placeholder: "Registration Fee (optional)" })), /* @__PURE__ */ React.createElement("textarea", { value: form.rules, onChange: (e) => setForm({ ...form, rules: e.target.value }), className: "p-2 rounded", placeholder: "Rules or Guidelines (textarea)", rows: 3 }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block mb-1" }, "Event Banner Upload (image preview before submit)"), /* @__PURE__ */ React.createElement("input", { type: "file", accept: "image/*", onChange: onBanner }), bannerPreview && /* @__PURE__ */ React.createElement("img", { src: bannerPreview, className: "mt-2 h-40 object-cover rounded", alt: "banner preview" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block mb-1" }, "Optional Gallery Images Upload"), /* @__PURE__ */ React.createElement("input", { type: "file", accept: "image/*", multiple: true, onChange: onGallery }), galleryPreviews.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mt-2 flex gap-2 overflow-auto" }, galleryPreviews.map((g, i) => /* @__PURE__ */ React.createElement("img", { key: i, src: g, className: "h-20 object-cover rounded", alt: `g${i}` })))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block mb-1" }, "Tags / Keywords (add and press Enter or click Add)"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement("input", { value: tagInput, onChange: (e) => setTagInput(e.target.value), onKeyDown: (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  }, className: "p-2 rounded flex-1", placeholder: "Add a tag" }), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: addTag, className: "px-3 py-1 bg-slate-200 rounded" }, "Add")), /* @__PURE__ */ React.createElement("div", { className: "mt-2 flex gap-2 flex-wrap" }, form.tags.map((t) => /* @__PURE__ */ React.createElement("div", { key: t, className: "px-2 py-1 bg-slate-100 rounded flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", null, t), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => removeTag(t), className: "text-xs" }, "\xD7"))))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setStep(1), className: "px-3 py-1 border rounded" }, "Back"), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "px-4 py-2 bg-brand text-white rounded" }, "Create Event"))))));
}
export {
  CreateEvent as default
};
