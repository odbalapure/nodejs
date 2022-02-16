/* Sending SMS */
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "This is a test message from twilio!",
    from: process.env.TWILIO_PHONE_NO,
    to: process.env.PERSONAL_PHONE_NO,
  })
  .then((msg) => console.log("The message: ", msg))
  .catch((err) => console.log("The error: ", err));

/* ==================================================================== */

/* Sending whatsapp messages */
// require("dotenv").config();
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);

// const name = "Om Balapure";
// const date = new Date();

// client.messages
//   .create({
//     from: `whatsapp:${process.env.TWILIO_PHONE_NO}`,
//     to: `whatsapp:${process.env.PERSONAL_PHONE_NO}`,
//     body: `Hi ${name.split(" ")[0]}!\nYour appointment has been confirmed for ${date}.`,
//   })
//   .then((msg) => console.log("The message: ", msg))
//   .catch((err) => console.log("The error: ", err));

/* ==================================================================== */
