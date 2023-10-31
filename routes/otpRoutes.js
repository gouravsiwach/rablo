const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otpController");

router.post("/send-otp", async (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  try {
    const otp = await otpController.sendOTP(phoneNumber);
    res.json({ message: "OTP sent successfully", otp });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

router.post("/verify-otp", (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const userOTP = req.body.userOTP;

  if (!phoneNumber || !userOTP) {
    return res
      .status(400)
      .json({ message: "Phone number and OTP are required" });
  }

  const isOTPValid = otpController.verifyOTP(phoneNumber, userOTP);

  if (isOTPValid) {
    res.json({ message: "Correct OTP" });
  } else {
    res.status(401).json({ message: "Incorrect OTP" });
  }
});

router.post("/resend-otp", async (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  try {
    const otp = await otpController.sendOTP(phoneNumber);
    res.json({ message: "OTP resent successfully", otp });
  } catch (error) {
    res.status(500).json({ message: "Failed to resend OTP" });
  }
});

module.exports = router;
