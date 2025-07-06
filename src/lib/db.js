import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://junaidsalam639:0jyaOxR27YCBOY5U@cluster0.dgobc6g.mongodb.net/";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in .env");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
