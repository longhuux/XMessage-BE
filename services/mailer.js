const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv")
dotenv.config({path: "../config.env"})
sgMail.setApiKey(process.env.SG_KEY);

const sendSGMail = async ({
  recipient,
  sender,
  subject,
  html,
  text,
  content,
  attachments,
}) => {
  try {
    const from = sender || "huulong140103@gmail.com";
    const msg = {
      to: recipient, //email of recipient
      from: from,
      subject,
      html: html,
      text: text,
      attachments,
    };
    return sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
};

exports.sendMail = async () => {
  if (process.env.NODE_ENV === "development") {
    return new Promise.resolve();
  } else {
    return sendSGMail;
  }
};
