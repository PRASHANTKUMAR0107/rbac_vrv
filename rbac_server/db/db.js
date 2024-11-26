const mongoose = require("mongoose");

const connectDB = async () => {

  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI env variable is not set 😂");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected ✨");
  } catch (error) {
    console.error("DB connection error 🥲:", error);
    process.exit(1); // Exit if the connection fails
  }
};

module.exports = connectDB;
