require("dotenv").config();
const nodemailer = require("nodemailer");
async function run() {
  const host = process.env.SMTP_HOST;
  if (!host) return console.error("No SMTP_HOST in env");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  try {
    await transporter.verify();
    console.log("SMTP verified");
  } catch (err) {
    console.error("SMTP verify failed", err && err.message);
    return;
  }
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: "Test email from College Events",
      text: "This is a test email to verify SMTP settings."
    });
    console.log("Sent:", info.messageId || info.response);
  } catch (err) {
    console.error("Send failed", err && err.message);
  }
}
run();
