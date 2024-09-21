// lib/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

let cachedClient: mongoose.Mongoose | null = null;

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }
  if (cachedClient) {
    console.log("connected to Mongodb");
    return cachedClient;
  }

  const client = await mongoose.connect(MONGODB_URI);

  cachedClient = client;
  return client;
}
