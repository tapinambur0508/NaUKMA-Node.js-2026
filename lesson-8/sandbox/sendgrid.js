import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "vmudrij0508@gmail.com",
  from: "vmudrij0508@gmail.com", // Use the email address or domain you verified above
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

sgMail.send(msg).then(
  () => {},
  (error) => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  },
);
