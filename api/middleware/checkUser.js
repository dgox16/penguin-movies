import { SECRET } from "../envConfig.js";
import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: "Token Missing" });
    }

    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Token invalid" });
        }
        req.user = user;
        next();
    });
};

export const adminRequired = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: "Token Missing" });
    }
    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Token invalid" });
        }
        if (!user.isAdmin) {
            return res.status(403).json({ error: "Token invalid" });
        }
        req.user = user;
        next();
    });
};
