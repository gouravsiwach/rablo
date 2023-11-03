const twilio = require("twilio");
require("dotenv").config();

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const otps = {}; // Store OTPs for verification

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

function sendOTP(phoneNumber) {
  if (otps[phoneNumber]) {
    // An OTP has already been sent; update and resend it
    const otp = generateOTP();
    otps[phoneNumber] = otp;
    return client.messages
      .create({
        body: `Your new OTP is: ${otp}`,
        from: "+16206598920",
        to: phoneNumber,
      })
      .then((message) => {
        console.log(`Resent OTP to ${phoneNumber}: ${otp}`);
        return otp;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  } else {
    // No OTP has been sent; generate and send a new one
    const otp = generateOTP();
    otps[phoneNumber] = otp;
    return client.messages
      .create({
        body: `Your OTP is: ${otp}`,
        from: "+16206598920",
        to: phoneNumber,
      })
      .then((message) => {
        console.log(`OTP sent to ${phoneNumber}: ${otp}`);
        return otp;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }
}

function verifyOTP(phoneNumber, userOTP) {
  if (otps[phoneNumber] === userOTP) {
    return true; // OTP is valid
  } else {
    return false; // OTP is not valid
  }
}

module.exports = { sendOTP, verifyOTP };
