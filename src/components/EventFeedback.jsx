import React, { useEffect, useState } from "react";
import { fetchEventFeedback, submitEventFeedback, setAuthToken } from "../utils/mockApi";
function EventFeedback({ eventId }) {
  const [feedback, setFeedback] = useState([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEventFeedback(eventId);
      setFeedback(data.feedback);
      setAverage(data.averageRating);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to load feedback");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (eventId) load();
  }, [eventId]);
  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please sign in to leave feedback");
        setSubmitting(false);
        return;
      }
      setAuthToken(token);
      await submitEventFeedback(eventId, rating, comment);
      setSuccess("Feedback saved");
      setRating(0);
      setComment("");
      await load();
    } catch (e2) {
      setError(e2?.response?.data?.message || e2.message || "Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  }
  return /* @__PURE__ */ React.createElement("div", { className: "mt-10" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Feedback"), loading && /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, "Loading feedback..."), !loading && feedback.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-500" }, "No feedback yet."), !loading && feedback.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "space-y-4 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-sm" }, /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, "Average rating:"), /* @__PURE__ */ React.createElement("span", null, average.toFixed(2), " / 5")), feedback.map((f, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "p-4 rounded bg-slate-50 dark:bg-slate-800" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, f.user || "User"), /* @__PURE__ */ React.createElement("span", { className: "text-xs px-2 py-1 rounded bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200" }, f.rating, "\u2605")), f.comment && /* @__PURE__ */ React.createElement("div", { className: "text-sm text-slate-600 dark:text-slate-300" }, f.comment), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] mt-1 text-slate-400" }, new Date(f.createdAt).toLocaleString())))), /* @__PURE__ */ React.createElement("form", { onSubmit, className: "space-y-4 bg-white dark:bg-slate-900 p-4 rounded border border-slate-200 dark:border-slate-700" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm font-medium" }, "Leave your feedback"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      key: n,
      onClick: () => setRating(n),
      className: `w-10 h-10 rounded flex items-center justify-center border ${rating >= n ? "bg-yellow-400 dark:bg-yellow-500 text-black" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`,
      "aria-label": `Rate ${n}`
    },
    n,
    "\u2605"
  ))), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: comment,
      onChange: (e) => setComment(e.target.value),
      placeholder: "Share details about your experience",
      rows: 3,
      className: "w-full text-sm p-2 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
    }
  ), error && /* @__PURE__ */ React.createElement("div", { className: "text-sm text-red-600" }, error), success && /* @__PURE__ */ React.createElement("div", { className: "text-sm text-green-600" }, success), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "submit",
      disabled: submitting || rating === 0,
      className: "px-4 py-2 rounded bg-blue-600 disabled:opacity-50 text-white text-sm"
    },
    submitting ? "Submitting..." : "Submit Feedback"
  ), rating === 0 && /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-400" }, "Select a rating"))));
}
export {
  EventFeedback as default
};
