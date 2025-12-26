const axios = require("axios");
const API = axios.create({ baseURL: "http://localhost:4000" });
async function run() {
  try {
    const email = `login_test${Date.now()}@example.com`;
    const password = "testpass123";
    const signup = await API.post("/api/auth/signup", { name: "Login Test", email, password, role: "student" });
    console.log("signup", signup.data);
    const login = await API.post("/api/auth/login", { email, password });
    console.log("login", login.data);
  } catch (err) {
    if (err.response) {
      console.error("err status", err.response.status);
      console.error("err data", err.response.data);
    } else {
      console.error("err", err.message);
    }
  }
}
run();
