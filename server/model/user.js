const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true,
    min: 3,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  isadmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdByDate: {
    type: Date,
    default: Date.now(),
  },
  updatedByDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userschema);
