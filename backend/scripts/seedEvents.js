require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("../src/models/Event");
async function run() {
  const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/college_events";
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to MongoDB for seeding");
  const now = /* @__PURE__ */ new Date();
  const events = [
    {
      title: "Hackathon Weekend",
      desc: "An intense 48-hour coding marathon. Build cool projects and win prizes!",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14).toISOString(),
      startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14, 10).toISOString(),
      endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14, 20).toISOString(),
      location: "Main Auditorium",
      type: "Competition",
      department: "Computer Science",
      popularity: 42,
      image: "hackathon.jpg",
      fee: 0,
      tags: ["hackathon", "coding", "teams"],
      seeded: true
    },
    {
      title: "Workshop: Modern Web",
      desc: "A hands-on workshop covering React, Vite and Tailwind. Bring your laptop.",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 21).toISOString(),
      startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 21, 11).toISOString(),
      endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 21, 14).toISOString(),
      location: "Lab 3",
      type: "Workshop",
      department: "IT Services",
      popularity: 18,
      image: "workshop.jpg",
      fee: 50,
      tags: ["workshop", "web", "react"],
      seeded: true
    },
    {
      title: "Guest Lecture: AI Trends",
      desc: "Industry speaker on current trends in AI and opportunities for students.",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7).toISOString(),
      startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 16).toISOString(),
      endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 18).toISOString(),
      location: "Lecture Hall B",
      type: "Talk",
      department: "AI Club",
      popularity: 64,
      image: "coding.jpg",
      fee: 0,
      tags: ["ai", "lecture"],
      seeded: true
    },
    {
      title: "Music Night",
      desc: "Live performances by student bands. Snacks and drinks available.",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 28).toISOString(),
      startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 28, 19).toISOString(),
      endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 28, 22).toISOString(),
      location: "Open Grounds",
      type: "Entertainment",
      department: "Cultural Affairs",
      popularity: 120,
      image: "landing.jpg",
      fee: 20,
      tags: ["music", "concert"],
      seeded: true
    },
    {
      title: "Career Fair",
      desc: "Meet top companies and apply for internships and placements.",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 35).toISOString(),
      startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 35, 10).toISOString(),
      endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 35, 17).toISOString(),
      location: "Exhibition Center",
      type: "Fair",
      department: "Placement Cell",
      popularity: 200,
      image: "coding.jpg",
      fee: 0,
      tags: ["career", "jobs"],
      seeded: true
    }
  ];
  try {
    const ops = events.map((ev) => ({ updateOne: { filter: { title: ev.title }, update: { $setOnInsert: ev }, upsert: true } }));
    const res = await Event.bulkWrite(ops);
    console.log("Seed result:", res);
  } catch (err) {
    console.error("Seeding failed", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected");
  }
}
run().catch((err) => {
  console.error(err);
  process.exit(1);
});
