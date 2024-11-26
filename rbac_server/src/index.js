require("dotenv").config();
require("regenerator-runtime/runtime");
const express = require("express");
const cors = require("cors");
const role = require("./routes/role");
const user = require("./routes/user");
const connectDB = require("./db/db");
const app = express();

app.use(express.json());
app.use(cors());

//mongoDB connection
connectDB();

//USER KE ROUTES
user(app);
//roles ke routes
role(app);

// Catch All Error 
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));