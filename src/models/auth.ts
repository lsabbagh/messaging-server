import { Document, Model, Schema, model } from "mongoose";
require("dotenv").config({ path: "./config.env" });

interface AuthInterface extends Document {
  userId: Schema.Types.ObjectId;
  token: string;
  authtype: string;
  created_at: any;
}

// Define the Conversation schema
const AuthenticationSchema: Schema<AuthInterface> = new Schema({
  userId: { type: String, ref: "User"},
  token: { type: String, required: true, unique: true },
  authtype: { type: String, enum: ["cms", "mbl"] },
  created_at: { type: Date, default: Date.now },
});

// Index the `createdAt` field with a TTL index of your desired expiration time
AuthenticationSchema.index({ createdAt: 1 }, { expireAfterSeconds: parseInt(process.env.AUTH_TIME_OUT) });

const Auth: Model<AuthInterface> = model("Auth", AuthenticationSchema);

export default Auth