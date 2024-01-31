const mongoose = require("mongoose");

export async function connection() {
  try {
    await mongoose.connect(process.env.MongoDB);
    console.log("Succesfully connected to mongodb");
  } catch (err) {
    console.log("DATABASE_CONNECTION_ERR", err);
  }
}
