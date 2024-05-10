import mongoose, {
  Connection as TConnection,
  ConnectOptions as TConnectOptions
} from "mongoose";

import dotenv from "dotenv";

dotenv.config();

type TgetConnection = (dbURI: string, dbName: string) => Promise<TConnection>

const getMongooseConnection: TgetConnection = async (dbURI, dbName) => {
  if (!dbURI) throw new Error("MONGO_URI is not defined in the .env file.")

  mongoose.set({ strictQuery: true })
  try {
    const options: TConnectOptions = { dbName };

    const { connection } = await mongoose.connect(dbURI, options);

    await connection.asPromise()

    return connection

  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
};

export default getMongooseConnection;
