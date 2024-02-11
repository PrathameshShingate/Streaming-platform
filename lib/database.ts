const mongoose = require("mongoose");
let cachedDb: any = null;

export async function connectToDatabase() {
  try {
    // Set strict query mode for Mongoose to prevent unknown field queries.
    mongoose.set("strictQuery", true);

    // If the connection is already established, return without creating a new connection.
    if (cachedDb) {
      return cachedDb;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);
    cachedDb = db;

    console.log("Succesfully connected to mongodb");
    return db;
  } catch (err) {
    console.log("DATABASE_CONNECTION_ERR", err);
    return null;
  }
}

export async function disconnectFromDatabase() {
  if (cachedDb) {
    await mongoose.disconnect();
    cachedDb = null;
  }
}
