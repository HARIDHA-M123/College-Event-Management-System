require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendViaSendGrid(to, subject, text, html) {
  try {
    const sg = require('@sendgrid/mail');
    sg.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = { to, from: process.env.SENDGRID_FROM || process.env.SMTP_USER, subject, text };
    if (html) msg.html = html;
    const res = await sg.send(msg);
    return { provider: 'sendgrid', info: res };
  } catch (err) {
    return { error: err };
  }
}

function createSmtpTransport() {
  const host = process.env.SMTP_HOST;
  if (!host) return null;
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = port === 465;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    tls: { rejectUnauthorized: false },
    logger: true,
    debug: true,
  });
}

async function sendViaSmtp(to, subject, text, html) {
  const transporter = createSmtpTransport();
  if (!transporter) return { error: new Error('No SMTP configured') };
  try {
    const info = await transporter.sendMail({ from: process.env.SMTP_USER, to, subject, text, html });
    return { provider: 'smtp', info };
  } catch (err) {
    return { error: err };
  }
}

async function sendConfirmationEmail(to, subject, text, html) {
  if (process.env.SENDGRID_API_KEY) {
    const r = await sendViaSendGrid(to, subject, text, html);
    if (!r.error) return r;
    console.warn('SendGrid send failed, falling back to SMTP:', r.error && r.error.message);
  }
  return sendViaSmtp(to, subject, text, html);
}

module.exports = { sendConfirmationEmail };
