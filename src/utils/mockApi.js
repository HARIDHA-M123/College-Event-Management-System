import axios from "axios";
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000" });
API.interceptors.request.use((config) => {
  try {
    if (!config.headers) config.headers = {};
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
  }
  return config;
}, (err) => Promise.reject(err));
async function fetchEvents() {
  const r = await API.get("/api/events");
  const evs = r.data.events || [];
  return evs.map((e) => {
    const org = e.organizer;
    return {
      ...e,
      id: e._id,
      organizer: org ? org.name || org : void 0,
      organizerAvatar: org && org.avatar ? org.avatar : void 0,
      fee: typeof e.fee === "number" ? e.fee : e.fee ? Number(e.fee) : 0,
      attendeeCount: Array.isArray(e.attendees) ? e.attendees.length : typeof e.attendeesCount === "number" ? e.attendeesCount : 0
    };
  });
}
async function fetchEventById(id) {
  const r = await API.get(`/api/events/${id}`);
  const e = r.data.event;
  if (!e) return null;
  const org = e.organizer;
  return {
    ...e,
    id: e._id,
    organizer: org ? org.name || org : void 0,
    organizerAvatar: org && org.avatar ? org.avatar : void 0,
    fee: typeof e.fee === "number" ? e.fee : e.fee ? Number(e.fee) : 0,
    attendeeCount: Array.isArray(e.attendees) ? e.attendees.length : typeof e.attendeesCount === "number" ? e.attendeesCount : 0
  };
}
async function fetchEventFeedback(id) {
  const r = await API.get(`/api/events/${id}/feedback`);
  return {
    feedback: (r.data.feedback || []).map((f) => ({
      user: f.user && (f.user.name || f.user),
      userId: f.user && f.user._id ? f.user._id : void 0,
      rating: f.rating,
      comment: f.comment,
      createdAt: f.createdAt
    })),
    averageRating: r.data.averageRating || 0
  };
}
async function submitEventFeedback(id, rating, comment) {
  const payload = { rating, comment };
  const r = await API.post(`/api/events/${id}/feedback`, payload);
  return r.data;
}
async function signup(payload) {
  const r = await API.post("/api/auth/signup", payload);
  return r.data;
}
async function login(payload) {
  const r = await API.post("/api/auth/login", payload);
  return r.data;
}
function setAuthToken(token) {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
}
var stdin_default = API;
export {
  stdin_default as default,
  fetchEventById,
  fetchEventFeedback,
  fetchEvents,
  login,
  setAuthToken,
  signup,
  submitEventFeedback
};
