require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Event = require("../src/models/Event");
const User = require("../src/models/User");
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/college_events";
function datePlus(days) {
  const d = /* @__PURE__ */ new Date();
  d.setUTCDate(d.getUTCDate() + days);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
async function run() {
  try {
    console.log("[seedRealEvents] Connecting to", MONGO);
    await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    const assetsDir = path.resolve(__dirname, "..", "..", "public", "assets");
    const assetFiles = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir).filter((f) => /\.(png|jpe?g|gif|webp)$/i.test(f)) : [];
    console.log("[seedRealEvents] Found assets:", assetFiles);
    console.log("[seedRealEvents] Removing existing events...");
    const del = await Event.deleteMany({});
    console.log(`[seedRealEvents] Deleted ${del.deletedCount} events.`);
    let organizerUser = await User.findOne({ role: { $in: ["organizer", "admin"] } });
    if (!organizerUser) {
      organizerUser = new User({
        name: "Tech Club Organizer",
        email: `organizer_${Date.now()}@example.com`,
        role: "organizer"
      });
      await organizerUser.save();
      console.log("[seedRealEvents] Created organizer user:", organizerUser._id.toString());
    } else {
      console.log("[seedRealEvents] Using existing organizer:", organizerUser.name, organizerUser._id.toString());
    }
    const eventsData = [
      {
        title: "Campus Hackathon 2025",
        desc: "48-hour coding marathon solving real campus challenges.",
        date: datePlus(3),
        startTime: "09:00",
        endTime: "18:00",
        type: "competition",
        department: "Computer Science",
        location: "Innovation Lab",
        fee: 0,
        tags: ["hackathon", "coding", "innovation"],
        image: pickAsset(assetFiles, ["hackathon", "coding"])
      },
      {
        title: "Advanced Web Workshop",
        desc: "Hands-on workshop covering modern web tooling and performance.",
        date: datePlus(7),
        startTime: "10:00",
        endTime: "16:00",
        type: "workshop",
        department: "IT",
        location: "Main Auditorium",
        fee: 50,
        tags: ["web", "workshop", "performance"],
        image: pickAsset(assetFiles, ["workshop"])
      },
      {
        title: "Career Networking Evening",
        desc: "Meet industry professionals and alumni to expand your network.",
        date: datePlus(10),
        startTime: "17:00",
        endTime: "20:00",
        type: "social",
        department: "Placement Cell",
        location: "Student Center Hall",
        fee: 0,
        tags: ["career", "networking"],
        image: pickAsset(assetFiles, ["landing", "avatar"])
      },
      {
        title: "Intro to Competitive Coding",
        desc: "Session on strategies, problem patterns, and efficient practice.",
        date: datePlus(14),
        startTime: "11:00",
        endTime: "13:00",
        type: "seminar",
        department: "Computer Science",
        location: "Lecture Hall A",
        fee: 0,
        tags: ["coding", "seminar", "competitive"],
        image: pickAsset(assetFiles, ["coding"])
      }
    ];
    for (const ev of eventsData) {
      if (!ev.image && assetFiles.length) ev.image = assetFiles[0];
    }
    const inserted = [];
    for (const data of eventsData) {
      if (data.image) data.image = `/assets/${data.image}`;
      data.organizer = organizerUser._id;
      const event = new Event(data);
      await event.save();
      inserted.push(event);
      console.log("[seedRealEvents] Inserted", event.title, "->", event._id.toString(), "expiresAt", event.expiresAt);
    }
    console.log(`[seedRealEvents] Done. Inserted ${inserted.length} events.`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("[seedRealEvents] Error:", err);
    process.exit(1);
  }
}
function pickAsset(files, keywords) {
  if (!files || !files.length) return null;
  const lower = files.map((f) => f.toLowerCase());
  for (const kw of keywords) {
    const found = lower.find((f) => f.includes(kw.toLowerCase()));
    if (found) return files[lower.indexOf(found)];
  }
  return null;
}
run();
