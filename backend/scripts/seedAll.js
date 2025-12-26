require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
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
async function createUser({ name, email, password, role, interests = [] }) {
  const passwordHash = await bcrypt.hash(password, 10);
  const u = new User({ name, email, passwordHash, role, interests });
  await u.save();
  return u;
}
async function run() {
  console.log("[seedAll] Connecting to", MONGO);
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    console.log("[seedAll] Dropping database...");
    await mongoose.connection.db.dropDatabase();
    console.log("[seedAll] Database cleared");
    console.log("[seedAll] Creating users...");
    const admin = await createUser({
      name: "Admin One",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
      interests: ["management", "analytics"]
    });
    const orgAlice = await createUser({
      name: "Organizer Alice",
      email: "org.alice@example.com",
      password: "organizer123",
      role: "organizer",
      interests: ["web", "workshop"]
    });
    const orgBob = await createUser({
      name: "Organizer Bob",
      email: "org.bob@example.com",
      password: "organizer123",
      role: "organizer",
      interests: ["ai", "talks"]
    });
    const orgCarol = await createUser({
      name: "Organizer Carol",
      email: "org.carol@example.com",
      password: "organizer123",
      role: "organizer",
      interests: ["design", "culture"]
    });
    const orgDev = await createUser({
      name: "Organizer Dev",
      email: "org.dev@example.com",
      password: "organizer123",
      role: "organizer",
      interests: ["cloud", "security"]
    });
    const orgEve = await createUser({
      name: "Organizer Eve",
      email: "org.eve@example.com",
      password: "organizer123",
      role: "organizer",
      interests: ["sports", "film"]
    });
    const s1 = await createUser({ name: "Alex Student", email: "alex@student.example.com", password: "student123", role: "student", interests: ["ai", "tech", "music"] });
    const s2 = await createUser({ name: "Priya Student", email: "priya@student.example.com", password: "student123", role: "student", interests: ["web", "workshop"] });
    const s3 = await createUser({ name: "Li Student", email: "li@student.example.com", password: "student123", role: "student", interests: ["career", "networking"] });
    const s4 = await createUser({ name: "Diego Student", email: "diego@student.example.com", password: "student123", role: "student", interests: ["music", "festival"] });
    const s5 = await createUser({ name: "Sam Student", email: "sam@student.example.com", password: "student123", role: "student", interests: ["coding", "competition"] });
    const students = [s1, s2, s3, s4, s5];
    console.log("[seedAll] Creating events...");
    const eventsData = [
      {
        title: "Campus Hackathon 2025",
        desc: "48-hour coding marathon solving real campus challenges.",
        date: datePlus(5),
        startTime: "09:00",
        endTime: "18:00",
        type: "Competition",
        department: "Computer Science",
        location: "Innovation Lab",
        fee: 0,
        tags: ["hackathon", "coding", "innovation"],
        image: "/assets/coding.jpg",
        organizer: orgAlice._id,
        attendees: [s1._id, s5._id],
        feedback: [{ user: s1._id, rating: 5, comment: "Excited for this!" }]
      },
      {
        title: "Advanced Web Workshop",
        desc: "Hands-on workshop covering modern web tooling and performance.",
        date: datePlus(10),
        startTime: "10:00",
        endTime: "16:00",
        type: "Workshop",
        department: "IT Services",
        location: "Main Auditorium",
        fee: 50,
        tags: ["web", "workshop", "performance"],
        image: "/assets/workshop.jpg",
        organizer: orgAlice._id,
        attendees: [s2._id],
        feedback: [{ user: s2._id, rating: 4, comment: "Looks promising" }]
      },
      {
        title: "Career Networking Evening",
        desc: "Meet industry professionals and alumni to expand your network.",
        date: datePlus(2),
        startTime: "17:00",
        endTime: "20:00",
        type: "Social",
        department: "Placement Cell",
        location: "Student Center Hall",
        fee: 0,
        tags: ["career", "networking"],
        image: "/assets/landing.jpg",
        organizer: orgBob._id,
        attendees: [s3._id, s1._id],
        feedback: [{ user: s3._id, rating: 5, comment: "Great opportunity" }]
      },
      {
        title: "Intro to Competitive Coding",
        desc: "Strategies, patterns, and efficient practice for contests.",
        date: datePlus(14),
        startTime: "11:00",
        endTime: "13:00",
        type: "Seminar",
        department: "Computer Science",
        location: "Lecture Hall A",
        fee: 0,
        tags: ["coding", "seminar", "competitive"],
        image: "/assets/hackathon.jpg",
        organizer: orgBob._id,
        attendees: [s5._id],
        feedback: [{ user: s5._id, rating: 4, comment: "Helpful tips" }]
      },
      {
        title: "Music Night Live",
        desc: "Live performances by student bands. Snacks and drinks available.",
        date: datePlus(20),
        startTime: "19:00",
        endTime: "22:00",
        type: "Entertainment",
        department: "Cultural Affairs",
        location: "Open Grounds",
        fee: 20,
        tags: ["music", "concert"],
        image: "/assets/landing.jpg",
        organizer: orgAlice._id,
        attendees: [s4._id, s1._id],
        feedback: [{ user: s4._id, rating: 5, comment: "Can\u2019t wait!" }]
      },
      {
        title: "AI Trends Guest Lecture",
        desc: "Industry speaker on current trends in AI and opportunities.",
        date: datePlus(-3),
        startTime: "16:00",
        endTime: "18:00",
        type: "Talk",
        department: "AI Club",
        location: "Lecture Hall B",
        fee: 0,
        tags: ["ai", "lecture"],
        image: "/assets/avatar.jpg",
        organizer: orgBob._id,
        attendees: [s1._id, s2._id, s3._id],
        feedback: [{ user: s1._id, rating: 5, comment: "Amazing talk" }, { user: s2._id, rating: 4, comment: "Very informative" }]
      }
    ];
    const moreEvents = [
      {
        title: "Data Science Bootcamp",
        desc: "Crash course on data wrangling, viz, and ML basics.",
        date: datePlus(4),
        startTime: "10:00",
        endTime: "17:00",
        type: "Workshop",
        department: "Statistics",
        location: "Lab 2",
        fee: 0,
        tags: ["data", "ml", "workshop"],
        image: "/assets/workshop.jpg",
        organizer: orgDev._id,
        attendees: [s1._id, s2._id],
        feedback: [{ user: s1._id, rating: 5, comment: "Must attend!" }]
      },
      {
        title: "Robotics Demo Day",
        desc: "Showcase of student-built robots and competitions.",
        date: datePlus(8),
        startTime: "12:00",
        endTime: "16:00",
        type: "Exhibition",
        department: "Mechanical",
        location: "Workshop Arena",
        fee: 0,
        tags: ["robotics", "demo"],
        image: "/assets/hackathon.jpg",
        organizer: orgBob._id,
        attendees: [s5._id, s1._id],
        feedback: [{ user: s5._id, rating: 4, comment: "Cool bots" }]
      },
      {
        title: "Sports Fest Opening",
        desc: "Kick-off ceremony with parade and pep rally.",
        date: datePlus(1),
        startTime: "09:00",
        endTime: "11:00",
        type: "Ceremony",
        department: "Sports Council",
        location: "Main Stadium",
        fee: 0,
        tags: ["sports", "parade"],
        image: "/assets/landing.jpg",
        organizer: orgEve._id,
        attendees: [s4._id, s3._id],
        feedback: [{ user: s4._id, rating: 5, comment: "Hyped!" }]
      },
      {
        title: "Film Screening Night",
        desc: "Classic cinema under the stars with popcorn.",
        date: datePlus(6),
        startTime: "19:00",
        endTime: "22:00",
        type: "Entertainment",
        department: "Film Club",
        location: "Open Grounds",
        fee: 10,
        tags: ["film", "cinema"],
        image: "/assets/avatar.jpg",
        organizer: orgEve._id,
        attendees: [s4._id],
        feedback: [{ user: s4._id, rating: 4, comment: "Fun vibe" }]
      },
      {
        title: "Design Thinking Workshop",
        desc: "Ideation to prototyping in a fast-paced session.",
        date: datePlus(12),
        startTime: "10:00",
        endTime: "15:00",
        type: "Workshop",
        department: "Design",
        location: "Studio 1",
        fee: 0,
        tags: ["design", "innovation"],
        image: "/assets/landing.jpg",
        organizer: orgCarol._id,
        attendees: [s2._id, s3._id],
        feedback: [{ user: s2._id, rating: 5, comment: "Very engaging" }]
      },
      {
        title: "Cloud Computing 101",
        desc: "Intro to IaaS, PaaS, and serverless patterns.",
        date: datePlus(15),
        startTime: "14:00",
        endTime: "17:00",
        type: "Seminar",
        department: "IT Services",
        location: "Lecture Hall C",
        fee: 0,
        tags: ["cloud", "serverless"],
        image: "/assets/coding.jpg",
        organizer: orgDev._id,
        attendees: [s1._id, s2._id, s3._id],
        feedback: [{ user: s3._id, rating: 4, comment: "Good intro" }]
      },
      {
        title: "Entrepreneurship Panel",
        desc: "Founders discuss fundraising and product-market fit.",
        date: datePlus(18),
        startTime: "16:00",
        endTime: "18:00",
        type: "Panel",
        department: "E-Cell",
        location: "Auditorium",
        fee: 0,
        tags: ["startup", "panel"],
        image: "/assets/workshop.jpg",
        organizer: orgCarol._id,
        attendees: [s1._id, s5._id],
        feedback: [{ user: s1._id, rating: 5, comment: "Inspiring" }]
      },
      {
        title: "Alumni Meetup",
        desc: "Reconnect with alumni and explore mentorship.",
        date: datePlus(22),
        startTime: "17:00",
        endTime: "20:00",
        type: "Social",
        department: "Alumni Office",
        location: "Conference Hall",
        fee: 0,
        tags: ["alumni", "networking"],
        image: "/assets/landing.jpg",
        organizer: orgBob._id,
        attendees: [s3._id, s2._id],
        feedback: [{ user: s3._id, rating: 5, comment: "Great connections" }]
      },
      {
        title: "Cybersecurity Awareness Seminar",
        desc: "Best practices to stay safe online.",
        date: datePlus(-1),
        startTime: "13:00",
        endTime: "15:00",
        type: "Seminar",
        department: "IT Services",
        location: "Lecture Hall D",
        fee: 0,
        tags: ["security", "awareness"],
        image: "/assets/coding.jpg",
        organizer: orgDev._id,
        attendees: [s2._id, s1._id, s5._id],
        feedback: [{ user: s2._id, rating: 4, comment: "Useful tips" }]
      },
      {
        title: "Cultural Gala",
        desc: "Dance, drama, and music from student clubs.",
        date: datePlus(30),
        startTime: "18:00",
        endTime: "22:00",
        type: "Festival",
        department: "Cultural Affairs",
        location: "Main Stage",
        fee: 0,
        tags: ["culture", "festival"],
        image: "/assets/landing.jpg",
        organizer: orgCarol._id,
        attendees: [s4._id, s1._id, s2._id],
        feedback: [{ user: s4._id, rating: 5, comment: "Showtime!" }]
      }
    ];
    const allEvents = [...eventsData, ...moreEvents];
    const inserted = [];
    for (const data of allEvents) {
      const ev = new Event(data);
      await ev.save();
      inserted.push(ev);
      console.log("[seedAll] Inserted event", ev.title, "popularity=", ev.popularity, "avgRating=", ev.averageRating, "attendees=", ev.attendees.length);
    }
    console.log("\n[seedAll] Done.");
    console.log("Login credentials for testing:");
    console.log("  Admin:    admin@example.com / admin123");
    console.log("  Organizer: org.alice@example.com / organizer123");
    console.log("  Organizer: org.bob@example.com   / organizer123");
    console.log("  Organizer: org.carol@example.com / organizer123");
    console.log("  Organizer: org.dev@example.com   / organizer123");
    console.log("  Organizer: org.eve@example.com   / organizer123");
    console.log("  Student:  alex@student.example.com / student123");
    console.log("  Student:  priya@student.example.com / student123");
    console.log("  Student:  li@student.example.com / student123");
    console.log("  Student:  diego@student.example.com / student123");
    console.log("  Student:  sam@student.example.com / student123");
  } catch (err) {
    console.error("[seedAll] Error:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("[seedAll] Disconnected");
  }
}
run();
