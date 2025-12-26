require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("../src/models/Event");
const User = require("../src/models/User");
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/college_events";
async function run() {
  try {
    await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    let user = await User.findOne();
    if (!user) {
      user = new User({ name: "Feedback Tester", email: "tester@example.com", password: "hashedplaceholder", role: "student" });
      await user.save();
      console.log("Created test user", user._id.toString());
    }
    const ev = await Event.findOne();
    if (!ev) {
      console.log("No event found to test feedback. Seed events first.");
      process.exit(0);
    }
    ev.upsertFeedback(user._id, 5, "Excellent event");
    await ev.save();
    console.log("Feedback saved. Average rating:", ev.averageRating);
    const refreshed = await Event.findById(ev._id).populate("feedback.user", "name email");
    console.log("Stored feedback entries:", refreshed.feedback.map((f) => ({ user: f.user.name, rating: f.rating, comment: f.comment })));
    await mongoose.disconnect();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
run();
