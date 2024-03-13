import mongoose, { Mongoose } from "mongoose";

interface ConnType {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cache: ConnType = (global as any).mongoose;
const URL = process.env.MONGO_URI as string;

if (!cache) {
  cache = (global as any).mongoose || { conn: null, promise: null };
}

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
