const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "your-secret-key";
const Token = require("../models/token");
const verifyToken = require("../middleware/verifyToken");
const uuid = require("uuid");

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if a user with the provided email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or username is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a UUID for the user
    const userUUID = uuid.v4();

    const user = new User({
      username,
      email,
      password: hashedPassword,
      uuid: userUUID,
    });

    // Save the user document, including the UUID, to the database
    await user.save();

    // Generate a token for the newly created user
    const token = jwt.sign({ email: user.email }, secretKey, {
      expiresIn: "1d",
    });

    // Store the token in the database (optional and depends on your requirements)
    const tokenEntry = new Token({ email: user.email, token });
    await tokenEntry.save();

    res.status(201).json({ message: "User Created", token, uuid: userUUID });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Registration failed", error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if a user with the provided username exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    // Fetch the UUID from the user's document
    const userUUID = user.uuid;

    // Generate a token for the authenticated user
    const token = jwt.sign({ email: user.email }, secretKey, {
      expiresIn: "1d",
    });

    // Store the token in the database (optional and depends on your requirements)
    const tokenEntry = new Token({ email: user.email, token });
    await tokenEntry.save();

    console.log("Generated Token for Login:", token);
    console.log("User's Email:", user.email);

    res
      .status(200)
      .json({ message: "Login successful", token, uuid: userUUID });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: `Access granted by user: ${req.user}` });
});

module.exports = router;
