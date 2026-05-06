import mongoose from "mongoose";
import { conf } from "../conf/conf.js";
export const connectDb = async () => {
  try {
    await mongoose.connect(conf.MONGO_DB_URI);
    console.log("MongoDb Connected successfully");
  } catch (error) {
    console.error("MongoDb connection Error", error);
  }
};
