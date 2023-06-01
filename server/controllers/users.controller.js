import { encryptPassword } from "../libs/passwordHash.js";
import User from "../models/User.js";

export const createUser = async (req, res) => {
    const { username, password, firstName, lastName, isAdmin } = req.body;
    const passwordHash = await encryptPassword(password);
    const newUser = new User({ username, password: passwordHash, firstName, lastName, isAdmin });
    const user = await newUser.save();
    res.json(user);
};
