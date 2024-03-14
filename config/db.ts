import * as def from "ajv/dist/vocabularies/discriminator";
import { ConnectOptions, MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const localhostUri = "mongodb://localhost:27017/test";
const dbURI = process.env.MONGO_URI;

const client = new MongoClient(localhostUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = async () => {
  if (!dbURI) {
    throw new Error("MONGO_URI is not defined in the .env file.");
  }

//   console.log('....dbURI', dbURI);

  mongoose.set("strictQuery", true);
  try {
    const options: any = { // Using 'any' type to avoid TypeScript error instead of ConnectOptions
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
  
    mongoose.connect(localhostUri, options);
    console.log("MongoDB Connected");

  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
};

export default connectDB;
