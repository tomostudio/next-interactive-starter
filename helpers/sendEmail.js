// sendEmail.js
import nodemailer from 'nodemailer';
const postmark = require('postmark');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
});

export default async function sendEmail(to, subject, text) {
  const client = new postmark.ServerClient('a436aa0c-3de6-47db-8ece-24ccc2ba395e');  
  try {
    await client.sendEmail({
      "From": "tlr@tomostudio.id",
      "To": "dimas@tomostudio.id",
      "Subject": "Test",
      "TextBody": "Hello from Postmark!"
    });
    return "email send"
  } catch (error) {
    console.error('Error sending email:', error);
    return "email error"
  }
}
