const axios = require("axios");
const API = axios.create({ baseURL: "http://localhost:4000" });
async function run() {
  try {
    const email = `testuser${Date.now()}@example.com`;
    const signup = await API.post("/api/auth/signup", { name: "Test User", email, password: "pass1234", role: "organizer" });
    console.log("signup", signup.data);
    const token = signup.data.token;
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const ev = {
      title: "Automated Test Event",
      desc: "Created by test script",
      date: "2025-10-10",
      startTime: "2025-10-10T10:00",
      endTime: "2025-10-10T12:00",
      type: "Test",
      department: "Testing",
      image: "/assets/event1.jpg"
    };
    const created = await API.post("/api/events", ev);
    console.log("created event", created.data);
  } catch (err) {
    console.error("error", err.response ? err.response.data : err.message);
  }
}
run();
