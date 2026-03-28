import nodemailer from "nodemailer";

import CONFIG from "../config";

const transporter = nodemailer.createTransport({
  host: CONFIG.smtpHost,
  port: CONFIG.smtpPort,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: CONFIG.smtpAuthUser,
    pass: CONFIG.smtpAuthPass,
  },
});

interface Message {
  to: string;
  subject: string;
  text: string;
  html: string;
}

async function sendMail(msg: Message): Promise<void> {
  await transporter.sendMail({ ...msg, from: CONFIG.senderEmail });
}

export default sendMail;
