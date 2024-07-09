import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const SECRET = process.env.SECRET;
export const MONGODB_URI = process.env.MONGODB_URI;
