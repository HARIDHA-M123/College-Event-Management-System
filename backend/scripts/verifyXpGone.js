require("dotenv").config();
const mongoose = require("mongoose");
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/college_events";
(async () => {
  try {
    console.log("[verifyXpGone] Connecting to", MONGO);
    await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    const User = require("../src/models/User");
    const withXp = await User.countDocuments({ xp: { $exists: true } });
    console.log("[verifyXpGone] Users with xp field:", withXp);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("[verifyXpGone] Error:", err && err.message ? err.message : err);
    try {
      await mongoose.disconnect();
    } catch {
    }
    process.exit(1);
  }
})();
