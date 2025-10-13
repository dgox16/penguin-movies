import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 80;
export const SECRET = process.env.SECRET;
export const MONGODB_URI = process.env.MONGODB_URI;
export const URL_CLIENT = process.env.URL_CLIENT;
export const CN_NAME = process.env.CN_NAME;
export const CN_KEY = process.env.CN_KEY;
export const CN_SECRET = process.env.CN_SECRET;
