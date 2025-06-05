const nodemailer = require("nodemailer");
const { verificationHtml } = require("./messages/verificationMessage");
const { resetPasswordHtml } = require("./messages/resetPasswordMessage");

// Create a reusable transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send verification email
 */
const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const mailOptions = {
      from: `"${process.env.SMTP_SENDER_NAME}" <${process.env.SMTP_ADMIN_EMAIL}>`,
      to: email,
      subject: "Your Email Verification Code",
      html: verificationHtml(verificationToken),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

/**
 * Send password reset email
 */
const sendResetEmail = async (email, sendVerificationToken) => {
  try {
    const mailOptions = {
      from: `"${process.env.SMTP_SENDER_NAME}" <${process.env.SMTP_ADMIN_EMAIL}>`,
      to: email,
      subject: "Reset Your Password",
      html: resetPasswordHtml(sendVerificationToken),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Reset Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendResetEmail,
};
