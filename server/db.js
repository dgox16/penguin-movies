import mongoose from "mongoose";
import { MONGODB_URI } from "./envConfig.js";

export async function connectedDb() {
	if (!mongoose.connection.readyState) {
		try {
			const db = await mongoose.connect(MONGODB_URI, {
				bufferCommands: false,
			});

			console.info("Connected to ", db.connection.name);
		} catch (error) {
			console.error(error);
		}
	}
}
