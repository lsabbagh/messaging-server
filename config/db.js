const { ConnectOptions, MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config()

// const mongoURL = 'mongodb+srv://mahmoudalaissami:Sz3rFZUwqzKtMBqB@chatoo.rug7upo.mongodb.net/?retryWrites=true&w=majority'
const mongoURL = 'mongodb+srv://mahmoudalaissami:Sz3rFZUwqzKtMBqB@chatoo.rug7upo.mongodb.net/'
const dbURI = process.env.MONGO_URI

const client = new MongoClient(dbURI, {
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
    console.log('....dbURI', dbURI);

    mongoose.set('strictQuery', true);
    await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('MongoDb Connected');
}
module.exports = connectDB;