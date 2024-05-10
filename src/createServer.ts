require('dotenv').config({ path: './config.env' });

import { Express } from "express";
import { Server } from 'http'

type TcreateServer = (app: Express, port: number, onServer: () => void)
	=> Promise<Server>

const createServer: TcreateServer = async (app, port, onServer) => {

	let server

	const onError = (error, promise) => {
		server.close(() => process.exit(1))
	}
	server = app.listen(port, onServer);

	process.on("unhandledRejection", onError);

	return server
}
export default createServer