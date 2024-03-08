import mongoose from "mongoose";

let cache = (global as any).mongoose || { conn: null, promise: null };
const URL = process.env.MONGO_URI as string;

const connectToDatabase = async () => {
  if (cache.conn) return cache.conn;

  if (!URL) throw new Error("MONGO_URI missing!.");

  cache.promise =
    cache.promise ||
    mongoose.connect(URL, {
      dbName: "Every-penny",
      bufferCommands: false,
    } as mongoose.ConnectOptions);

  cache.conn = await cache.promise;

  return cache.conn;
};

export default connectToDatabase;
