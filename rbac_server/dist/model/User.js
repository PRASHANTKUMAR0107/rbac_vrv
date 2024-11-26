"use strict";

var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    "default": "User"
  },
  status: {
    type: String,
    "enum": ["Active", "Inactive"],
    "default": "Active"
  }
});
var User = mongoose.model("User", userSchema);
module.exports = User;