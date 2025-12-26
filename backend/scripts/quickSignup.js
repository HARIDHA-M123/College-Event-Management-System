const axios = require("axios")(async function() {
  try {
    const email = `quick${Date.now()}@example.com`;
    const res = await axios.post("http://localhost:4000/api/auth/signup", { name: "Quick", email, password: "abc1234", role: "student" });
    console.log("ok", res.data);
  } catch (e) {
    if (e.response) console.error("resp", e.response.status, e.response.data);
    else console.error("err", e.message);
  }
})();
