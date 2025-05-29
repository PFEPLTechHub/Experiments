const nodemailer = require("nodemailer");
const fs = require("fs");

const htmlBody = fs.readFileSync("email_template.html", "utf-8");

let transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io", // change this with your Mailtrap SMTP host
  port: 587,
  auth: {
    user: "5c866725dcfbbe", // from Mailtrap
    pass: "d752f0eb66b0fc"  // from Mailtrap
  }
});

let mailOptions = {
  from: '"HR Team" <shaikhazeem4646@gmail.com>',
  to: "shaikhazeem4646@gmail.com", // you can test with your own email
  subject: "Test Email - Tracking Pixel",
  html: htmlBody
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) return console.error("Error sending mail:", error);
  console.log("Email sent:", info.messageId);
});
