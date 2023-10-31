const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  email: String,
  token: String,
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
