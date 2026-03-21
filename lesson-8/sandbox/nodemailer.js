import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: "79f2cc001@smtp-brevo.com",
    pass: "xsmtpsib-5ca41876c02ce7be48a540287154b756041b0a36a267509c5c164a1e10409b67-0AKakHI6tbrEsyNv",
  },
});

const msg = {
  to: "vmudrij0508@gmail.com",
  from: "vmudrij0508@gmail.com", // Use the email address or domain you verified above
  subject: "Sending with Brevo is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

transporter
  .sendMail(msg)
  .then((res) => console.log(res))
  .catch((error) => console.error(error));
