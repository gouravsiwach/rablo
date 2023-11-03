const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const userdetailsRoutes = require("./routes/userdetails");
const twilio = require("twilio");
const otpRoutes = require("./routes/otpRoutes");
const secretKey = process.env.JWT_SECRET;

// Load environment variables from .env
const dotenv = require("dotenv");
require("dotenv").config();

const jwt = require("jsonwebtoken");

// ... rest of your code ...

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/", require("./routes/auth"));
app.use("/", userdetailsRoutes);
app.use("/", otpRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
