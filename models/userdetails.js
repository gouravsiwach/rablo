const mongoose = require("mongoose");

const userdetailsSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
  },
  guardianNumber: {
    type: Number,
    required: true,
  },
  houseNoAndStreet: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  referralCode: {
    type: String,
  },
  school: {
    type: String,
    required: true,
  },
  classs: {
    type: String,
    required: true,
  },
  board: {
    type: String,
    required: true,
  },
  subject: [
    {
      type: String,
    },
  ],
});

const Userdetails = mongoose.model("Userdetails", userdetailsSchema);

module.exports = Userdetails;
