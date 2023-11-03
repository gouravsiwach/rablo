const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const userSchema = new mongoose.Schema({
  uuid: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
