import { SECRET } from "../envConfig.js";
import { comparePassword, encryptPassword } from "../libs/passwordHash.js";
import ShoppingCart from "../models/ShoppingCart.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const getUsers = async (_req, res) => {
    const users = await User.find().populate("shoppingCart");
    res.json(users);
};

export const register = async (req, res) => {
    const { username, password, firstName, lastName, isAdmin } = req.body;
    const passwordHash = await encryptPassword(password);

    const userFound = await User.findOne({ username });

    if (userFound) {
        return res.status(401).json({
            error: "This username already exist",
        });
    } else {
        const newShoppingCart = new ShoppingCart({ movies: [] });
        await newShoppingCart.save();
        const newUser = new User({
            username,
            password: passwordHash,
            firstName,
            lastName,
            isAdmin,
            shoppingCart: newShoppingCart._id,
        });
        const user = await newUser.save();
        res.json(user);
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const passwordCorrect = user == null ? false : await comparePassword(user.password, password);

    const userForToken = {
        id: user._id,
        username: user.username,
    };

    const token = jwt.sign(userForToken, SECRET, {
        expiresIn: 60 * 60 * 24 * 7,
    });

    if (!passwordCorrect) {
        return res.status(401).json({
            error: "Invalid user or password",
        });
    }

    res.send({
        name: user.firstName,
        username: user.username,
        token,
    });
};
