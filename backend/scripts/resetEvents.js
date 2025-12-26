require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("../src/models/Event");
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/college_events";
async function run() {
  try {
    console.log("[resetEvents] Connecting to", MONGO);
    await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    const countBefore = await Event.countDocuments();
    console.log(`[resetEvents] Existing events: ${countBefore}`);
    const delRes = await Event.deleteMany({});
    console.log(`[resetEvents] Deleted ${delRes.deletedCount} events.`);
    const today = /* @__PURE__ */ new Date();
    const yyyy = today.getUTCFullYear();
    const mm = String(today.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(today.getUTCDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;
    const sampleEvent = new Event({
      title: process.env.SEED_EVENT_TITLE || "Sample Seed Event",
      desc: "This is a freshly seeded event after reset.",
      date: dateStr,
      startTime: "09:00",
      endTime: "11:00",
      type: "general",
      department: "general",
      image: "",
      location: "Main Hall",
      fee: 0,
      tags: ["sample", "reset"],
      organizer: null
      // Could be replaced with a valid user ObjectId if needed
    });
    await sampleEvent.save();
    console.log("[resetEvents] Inserted new event:", sampleEvent._id.toString());
    console.log("[resetEvents] Expires at:", sampleEvent.expiresAt);
    const countAfter = await Event.countDocuments();
    console.log(`[resetEvents] New total events: ${countAfter}`);
    await mongoose.disconnect();
    console.log("[resetEvents] Done.");
    process.exit(0);
  } catch (err) {
    console.error("[resetEvents] Error:", err);
    process.exit(1);
  }
}
run();
