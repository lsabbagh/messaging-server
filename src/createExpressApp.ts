require('dotenv').config({ path: './config.env' });

import express, { Express, Request, Response, NextFunction } from "express";
import cors from 'cors';

import { login, adminLogIn, logout, forgetpassword, verifyToken } from './controllers/logIn';
import userRouter from "./routes/users"
import messageRouter from "./routes/message"
import convRouter from "./routes/conversation"

const createExpressApp = () => {

	const app: Express = express();

	app.use(cors());

	app.use(express.json());

	app.use('/', (req: Request, res: Response, next: NextFunction) => {
		next()
	});

	// ADMIN routes
	app.post('/api/login', login);
	app.post('/api/admin/login', adminLogIn);
	app.delete('/api/logout/:userId', logout);
	app.post("/api/changePassword/user/forgetPassword", forgetpassword)

	// Verify token middleware
	app.use('/api/', verifyToken);

	// Basic Routes
	app.use("/api/users", userRouter);
	app.use("/api/conversation", convRouter);
	app.use("/api/message", messageRouter);

	app.use('/', (req: Request, res: Response) => {
		res.send({ message: "hello" })
	});

	return app
}

export default createExpressApp