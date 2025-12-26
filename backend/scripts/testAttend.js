const axios = require("axios");
const API = axios.create({ baseURL: "http://localhost:4000" });
async function run() {
  try {
    const email = `attendee${Date.now()}@example.com`;
    const signup = await API.post("/api/auth/signup", { name: "Attendee", email, password: "pass1234", role: "student" });
    const token = signup.data.token;
    console.log("signed up", signup.data.user);
    const evs = await API.get("/api/events");
    const event = evs.data.events && evs.data.events[0];
    if (!event) return console.log("no events to register");
    console.log("registering for", event._id);
    const r = await API.post(`/api/events/${event._id}/attend`, {}, { headers: { Authorization: `Bearer ${token}` } });
    console.log("attend response", r.data);
  } catch (err) {
    console.error("err", err.response ? err.response.data : err.message);
  }
}
run();
