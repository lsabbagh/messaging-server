require('dotenv').config({ path: './config.env' });

import express, { Express, Request, Response, NextFunction } from "express";
import cors from 'cors';
import connectDB from './config/db';
import errorHandler from './middleware/error';
import { login, adminLogIn, logout, forgetpassword, verifyToken } from './controllers/logIn';
import Auth from './models/auth';
import userRouter from "./routes/users"
import messageRouter from "./routes/message"
import convRouter from "./routes/conversation"

const app: Express = express();
const PORT: number | string = process.env.PORT || 5000;


//connect to db
connectDB()
app.use(cors());

app.use(express.json());

app.use('/', (req: Request, res:Response, next:NextFunction) => {
    console.log('....params', {
        params: req.params,
        body: req.body,
        originalUrl: req.originalUrl,
        headers: req.headers,
        // send: res.send,
        // json: res.json,
        // status: res.status,
    });
    next()
    // res.json('Render.com health check passed.');

});

// ADMIN routes
app.post('/api/login', login);
app.post('/api/admin/login', adminLogIn);
app.delete('/api/logout/:userId', logout);
app.post("/api/changePassword/user/forgetPassword", forgetpassword)

// Verify token middleware
// app.use('/api/', verifyToken);

// Basic Routes
app.use("/api/users", userRouter);
app.use("/api/conversation", convRouter);
app.use("/api/message", messageRouter);

app.use('/', (req:Request, res:Response) => {
    res.send({message: "hello"})
});

//Error handling middleware (Should be last piece of middleware)
// app.use(errorHandler);

const server = app.listen(
    PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    }
);

process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => process.exit(1))
});


//  
//  
// FEATURES:
// add animation: chatoo and the logo
// forget password: shuffle the id
// status (online, typing, offline) 
// last message should be displayed on chat list screen
// background selected by user image or default image or color
// line seperating chat list screen mafrod ykon shorter
// the profile should appear on the header of chat screen
// user should be able to change his email
// 
// 
// 
// make a web version
// check signal app that lets u make a server on ur phone / pc



// login,
//      USER:
// delete
// edit
// create