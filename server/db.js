import mongoose from "mongoose";
import { MONGODB_URI } from "./envConfig.js";

export async function connectedDb() {
	try {
		const db = await mongoose.connect(MONGODB_URI, { autoIndex: false });
		console.info("Connected to ", db.connection.name);
	} catch (error) {
		console.error(error);
	}
}
