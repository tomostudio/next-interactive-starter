// sendEmail.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
});

export default async function sendEmail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      to: "dimas@tomostudio.id",
      subject: "test nodemailer",
      text: "test send email with nodemailer",
    });
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
