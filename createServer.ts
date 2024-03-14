require('dotenv').config({ path: './config.env' });

import express, { Express, Request, Response, NextFunction } from "express";
import cors from 'cors';
import connectDB from './config/db';
import errorHandler from './middleware/error';
import { login, adminLogIn, logout, forgetpassword, verifyToken } from './controllers/logIn';
import userRouter from "./routes/users"
import messageRouter from "./routes/message"
import convRouter from "./routes/conversation"

const PORT: number | string = process.env.PORT || 5000;

export default () => {

	const app: Express = express();

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

	return app
	
}
