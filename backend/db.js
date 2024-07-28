import Mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const localDB = process.env.DB_URL;

const connectDB = async () => {
  await Mongoose.connect(localDB, {});
  console.log("MongoDB Connected");
};

export default connectDB;
