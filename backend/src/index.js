require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const debugRoutes = require("./routes/debug");
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use(cors());
app.use(express.json());
app.set("io", io);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/debug", debugRoutes);
const PORT = process.env.PORT || 4e3;
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/college_events";
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected to MongoDB");
  server.listen(PORT, () => console.log("Server listening on", PORT));
}).catch((err) => {
  console.error("MongoDB connection error", err);
});
io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on("disconnect", () => console.log("socket disconnected", socket.id));
});
