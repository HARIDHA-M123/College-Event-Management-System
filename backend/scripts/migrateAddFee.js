const mongoose = require("mongoose");
require("dotenv").config();
const Event = require("../src/models/Event");
async function run() {
  const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/college_events";
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected");
  const res = await Event.updateMany({ $or: [{ fee: { $exists: false } }, { fee: null }] }, { $set: { fee: 0 } });
  console.log("Updated", res.modifiedCount);
  process.exit(0);
}
run().catch((err) => {
  console.error(err);
  process.exit(1);
});
