const { ConnectOptions, MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
// require('dotenv').config()

const localhostUri = 'mongodb://localhost:27017'
const dbURI = process.env.MONGO_URI

const client = new MongoClient(localhostUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const connectDB = async () => {
    if (!dbURI) {
        throw new Error("MONGO_URI is not defined in the .env file.");
    }

    // await mongoose.connect(dbURI);
    // console.log('....dbURI', dbURI);

    mongoose.set('strictQuery', true);
    await mongoose.connect(localhostUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('MongoDb Connected');
}
module.exports = connectDB;