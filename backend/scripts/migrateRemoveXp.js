require("dotenv").config();
const mongoose = require("mongoose");
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/college_events";
(async () => {
  try {
    console.log("[migrateRemoveXp] Connecting to", MONGO);
    await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    const User = require("../src/models/User");
    console.log("[migrateRemoveXp] Unsetting xp from all users...");
    const res = await User.collection.updateMany(
      { xp: { $exists: true } },
      { $unset: { xp: "" } }
    );
    console.log(`[migrateRemoveXp] Matched: ${res.matchedCount}`);
    console.log(`[migrateRemoveXp] Modified: ${res.modifiedCount}`);
    await mongoose.disconnect();
    console.log("[migrateRemoveXp] Done.");
    process.exit(0);
  } catch (err) {
    console.error("[migrateRemoveXp] Error:", err && err.message ? err.message : err);
    try {
      await mongoose.disconnect();
    } catch {
    }
    process.exit(1);
  }
})();
