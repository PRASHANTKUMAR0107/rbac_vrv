"use strict";

require("dotenv").config();
require("regenerator-runtime/runtime");
var express = require("express");
var cors = require("cors");
var role = require("./routes/role");
var user = require("./routes/user");
var connectDB = require("./db/db");
var app = express();
app.use(express.json());
app.use(cors());

//mongoDB connection
connectDB();

//USER KE ROUTES
user(app);
//roles ke routes
role(app);

// Catch All Error 
app.use(function (err, req, res, next) {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({
    error: "Internal Server Error"
  });
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});