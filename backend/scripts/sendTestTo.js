require("dotenv").config();
const nodemailer = require("nodemailer");
async function run(to2) {
  if (!to2) {
    console.error("Usage: node sendTestTo.js recipient@example.com");
    process.exit(1);
  }
  const host = process.env.SMTP_HOST;
  if (!host) return console.error("No SMTP_HOST in env");
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = port === 465;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    tls: { rejectUnauthorized: false },
    logger: true,
    debug: true
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
      to: to2,
      subject: "Test send to " + to2,
      text: `This is a test email sent to ${to2} from ${process.env.SMTP_USER}`
    });
    console.log("Send info:", JSON.stringify({ messageId: info.messageId, response: info.response, accepted: info.accepted, rejected: info.rejected, envelope: info.envelope }, null, 2));
  } catch (err) {
    console.error("Send failed");
    console.error(err && err.stack ? err.stack : err);
  }
}
const to = process.argv[2] || process.env.TEST_TO;
run(to);
