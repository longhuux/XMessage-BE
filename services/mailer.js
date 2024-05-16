const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config({ path: "../config.env" });

const sendMailService = async ({ recipient, subject, html, attachments }) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    let mailOptions = {
      from: '"XMessage" <huulong140103@gmail.com>',
      to: recipient,
      subject: subject,
      html: html,
      attachments,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
};

exports.sendEmail = async (args) => {
  if (!process.env.NODE_ENV === "development") {
    return new Promise.resolve();
  } else {
    return sendMailService(args);
  }
};
