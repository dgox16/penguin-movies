import mongoose from "mongoose";
import { MONGODB_URI } from "./envConfig.js";

export async function connectedDB() {
	try {
		const db = await mongoose.connect(MONGODB_URI);
		console.log("Connected to ", db.connection.name);
	} catch (error) {
		console.error(error);
	}
}
