import { SECRET } from "../envConfig.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: "Token Missing" });
    }

    jwt.verify(token, SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Token invalid" });
        }
        req.user = await User.findById(user.id);
        next();
    });
};
