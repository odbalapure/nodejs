/* Sending SMS */
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "This is a test message from twilio!",
    from: process.env.TWILIO_PHONE_NO,
    to: "+91-8956764442",
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
//     from: "whatsapp:+14155238886",
//     to: "whatsapp:91-8956764442",
//     body: `Hi ${name.split(" ")[0]}!\nYour appointment has been confirmed for ${date}.`,
//   })
//   .then((msg) => console.log("The message: ", msg))
//   .catch((err) => console.log("The error: ", err));

/* ==================================================================== */
