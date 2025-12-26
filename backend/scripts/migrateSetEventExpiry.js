require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/college_events";
(async () => {
  try {
    console.log("[migrate] Connecting to", MONGO);
    await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    const Event = require("../src/models/Event");
    const retentionDays = Number(process.env.EVENT_RETENTION_DAYS) || 6;
    const events = await Event.find({ $or: [{ expiresAt: { $exists: false } }, { expiresAt: null }] });
    let updated = 0;
    for (const ev of events) {
      if (ev.expiresAt) continue;
      if (ev.date) {
        const parts = ev.date.split("-");
        let baseDate;
        if (parts.length === 3) {
          const year = Number(parts[0]);
          const month = Number(parts[1]) - 1;
          const day = Number(parts[2]);
          baseDate = new Date(Date.UTC(year, month, day));
        } else {
          baseDate = ev.createdAt || /* @__PURE__ */ new Date();
        }
        const ms = retentionDays * 24 * 60 * 60 * 1e3;
        ev.expiresAt = new Date(baseDate.getTime() + ms);
      } else {
        const ms = retentionDays * 24 * 60 * 60 * 1e3;
        ev.expiresAt = new Date((ev.createdAt || /* @__PURE__ */ new Date()).getTime() + ms);
      }
      await ev.save();
      updated++;
      console.log(`[migrate] Set expiresAt for event ${ev._id} -> ${ev.expiresAt.toISOString()}`);
    }
    console.log(`[migrate] Done. Updated ${updated} events.`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("[migrate] Error", err);
    process.exit(1);
  }
})();
